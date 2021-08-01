const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    item_id: {
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
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: false,
    }
})

const Product = mongoose.model('Product', productSchema)

export default Product