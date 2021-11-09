const db = require('../models');
const bycrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const s3 = require('aws-sdk/clients/s3')
const { GraphQLUpload } = require('graphql-upload')
import { v5 as uuidv5 } from 'uuid'
import Upload from '../interfaces/Upload'

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

// initializing S3 bucket
const bucket = new s3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
})

// Uploading images
const singleUpload = async (image: Promise<Upload>) => {
    const { filename, createReadStream } = await image
    const imageId = uuidv5(filename, process.env.UUID_NAMESPACE)
    const stream = createReadStream()
    const uploadParams = {
        Bucket: bucketName,
        Body: stream,
        Key: imageId,
    }
    return bucket.upload(uploadParams).promise()
}

// Retrieving images
const retreiveUpload = async (fileKey: string) => {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName,
        Expires: 3600
    }
    const uploadURL = await bucket.getSignedUrlPromise('getObject', downloadParams)
    return uploadURL
}

const resolvers = {

    Upload: GraphQLUpload,

    Query: {
        getProducts: async (parent, { category }) => {
            const result = await db.Product.find({ category: category })
            const newResult = JSON.parse(JSON.stringify(result))
            newResult.forEach((product) => {
                console.log(product.image)
                product["image"] = retreiveUpload(product.image)
            })
            return newResult
        }
    },
    Mutation: {
        addProduct: async (parent, { name, model, description, manufacturer, price, category, image, quantity }) => {
            const { Key } = await singleUpload(image)
            return db.Product.create({
                name,
                model,
                description,
                manufacturer,
                price,
                category,
                image: Key,
                quantity,
            })
        },
    }
}

export default resolvers