require('dotenv').config()
const express = require('express');
const session = require('express-session');
const morgan = require('morgan')
const cors = require('cors')
const { ApolloServer } = require('apollo-server-express')
import { graphqlUploadExpress } from 'graphql-upload'
import typeDefs from './controllers/typeDefs'
import resolvers from './controllers/resolvers'
import { join } from 'path';

const startServer = async () => {
    const server = new ApolloServer({ typeDefs, resolvers })
    const app = express()
    await server.start()
    app.use(graphqlUploadExpress())
    app.use(express.static(join(__dirname, './uploads')))
    server.applyMiddleware({ app, path: "/graphql" })

    // // Environment Variables
    const PORT = process.env.PORT || 4000;
    const SECRET = process.env.SESSION_SECRET;

    // // Middleware
    app.use(cors())
    app.use(morgan('tiny'))
    app.use(session({
        secret: SECRET,
        resave: true,
        saveUninitialized: true
    }))


    // // Serve Production build
    if (process.env.NODE_ENV === "production") {
        app.use(express.static('client/build'));
    }

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}

startServer()


