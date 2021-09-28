import Product from "./Product"
import User from "./User";

const mongoose = require('mongoose');
const Grid = require('gridfs-stream')

let gfs

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB')
})

mongoose.connection.once('open', () => {
    gfs = Grid(mongoose.connection.db, mongoose.mongo)
    gfs.collection("images");
})

mongoose.connection.on('error', (err) => {
    console.log(err);
});


module.exports = {
    User: User,
    Product: Product,
}