const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    implementation: {
        type: String,
        required: false
    },
    productType: {
        type: String,
        required: false
    },
    category: {
        type: Array,
        required: false
    },
    occasion: {
        type: Array,
        required: false
    },
    updatedAt: {
        type: Date,
        required: false
    }
})

module.exports = mongoose.model('Product', productSchema)