const db = require('../models');
const bycrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const path = require('path')
const fs = require('fs')
const { JWT_SECRET } = process.env;


const resolvers = {
    Query: {

    },
    Mutation: {
        singleUpload: async (parent, { file }) => {
            const { createReadStream, filename, mimetype, encoding } = await file
            const strem = createReadStream()
            const pathName = path.join(__dirname, `/server/images/${filename}`)
            await strem.pipe(fs.createWriteStream(pathName))
            return {
                url: `http://localhost:4000/images/${filename}`
            }
        }
    }
}

export default resolvers