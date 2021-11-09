const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    model: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        requred: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    manufacturer: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
    }
})

const Product = mongoose.model('Product', productSchema)

export default Product