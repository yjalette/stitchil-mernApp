const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gigSchema = new Schema({
    title: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    category: {
        type: Array,
        required: false
    },
    style: {
        type: Array,
        required: false
    },
    price: {
        type: Number,
        required: false
    },
    delivery: {
        type: Number,
        required: false
    },
    fabric: {
        type: Array,
        required: false
    },
    imageUrl: {
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
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        required: true
    }
})


module.exports = mongoose.model('Gig', gigSchema)