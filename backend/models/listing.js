const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listingSchema = new Schema({
    listingType: {
        type: String,
        required: false
    },
    details: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    delivery: {
        type: Number,
        required: false
    },
    price: {
        type: Number,
        required: false
    },
    attributes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Attribute'
        }
    ],
    variations: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Variation'
        }
    ],
    shipping_options: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Shipping'
        }
    ],
    keywords: {
        type: Array,
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


module.exports = mongoose.model('Listing', listingSchema)