const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    title: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    service: {
        type: Array,
        required: false
    },
    garment: {
        type: Array,
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
    style: {
        type: Array,
        required: false
    },
    coverImage: {
        type: String,
        required: false
    },
    gallery: {
        type: Array,
        required: false
    },
    keywords: {
        type: Array,
        required: false
    },
    group: {
        type: String,
        required: false
    },
    active: {
        type: Boolean,
        required: false
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: false
    }
})


module.exports = mongoose.model('Item', itemSchema)