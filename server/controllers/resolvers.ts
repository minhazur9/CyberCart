const db = require('../models');
const bycrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { GraphQLUpload } = require('graphql-upload')
import { parse, join } from 'path';
import { createWriteStream } from 'fs';

// Uploading images
const singleUpload = async (image) => {
    const { filename, createReadStream } = await image
    console.log(filename)
    const stream = createReadStream()
    let { name, ext } = parse(filename)
    name = name.replace(/([^a-z0-9 ]+)/gi, '-').replace(' ', '-')
    let serverFile = join(__dirname, `../uploads/${name}-${Date.now()}${ext}`)
    const writeStream = await createWriteStream(serverFile)
    await stream.pipe(writeStream)
    serverFile = `${process.env.URL}${serverFile.split('uploads')[1]}`
    return serverFile
}

// Format Search Filter 
const formatSearchFilter = (filter: string) => {
    return filter.charAt(0).toUpperCase() + filter.slice(1)
}


const resolvers = {

    Upload: GraphQLUpload,

    Query: {
        getProducts: async (parent, { category }) => {
            return db.Product.find({ category: formatSearchFilter(category) })
        }
    },
    Mutation: {
        addProduct: async (parent, { name, model, description, manufacturer, price, category, image, quantity }) => {
            const imageLink = await singleUpload(image)
            return db.Product.create({
                name,
                model,
                description,
                manufacturer,
                price: price,
                category,
                image: imageLink,
                quantity,
            })
        },
    }
}

export default resolvers