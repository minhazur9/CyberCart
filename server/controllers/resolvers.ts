const db = require('../models');
const bycrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const path = require('path')
const fs = require('fs')
const { GraphQLUpload } = require('graphql-upload')
import { parse, join } from 'path';
import { createWriteStream } from 'fs';
import { uploadFile } from './upload'

const singleUpload = async (file) => {
    const { filename, createReadStream } = await file
    const stream = createReadStream()
    let { name, ext } = parse(filename)
    name = name.replace(/([^a-z0-9 ]+)/gi, '-').replace(' ', '-')
    let serverFile = join(__dirname, `../uploads/${name}-${Date.now()}${ext}`)
    const writeStream = await createWriteStream(serverFile)
    await stream.pipe(writeStream)
    serverFile = `${process.env.URL}${serverFile.split('uploads')[1]}`
    return serverFile
}


const resolvers = {

    Upload: GraphQLUpload,

    Query: {
        // getImage: async (parent, args) => {

        // }
    },
    Mutation: {
        addProduct: async (parent, { name, model, description, manufacturer, price, category, file }) => {
            const imageLink = await singleUpload(file)
            console.log(imageLink)
            return await db.Product.create({
                name,
                model,
                description,
                manufacturer,
                price: price,
                category,
                image: imageLink
            })
        },
        singleUpload: async (parent, { file }) => {
            const { filename, createReadStream } = await file
            const stream = createReadStream()
            let { name, ext } = parse(filename)
            name = name.replace(/([^a-z0-9 ]+)/gi, '-').replace(' ', '-')
            let serverFile = join(__dirname, `../uploads/${name}-${Date.now()}${ext}`)
            const writeStream = await createWriteStream(serverFile)
            await stream.pipe(writeStream)
            serverFile = `${process.env.URL}${serverFile.split('uploads')[1]}`
            return serverFile
        }
    }
}

export default resolvers