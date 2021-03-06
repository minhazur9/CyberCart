import { Error } from "mongoose";
import Product from "./Product"
import User from "./User";

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB')
})

mongoose.connection.on('error', (err: Error) => {
    console.log(err);
});


module.exports = {
    User: User,
    Product: Product,
}