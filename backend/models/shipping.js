const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shippingSchema = new Schema({
    itemId: {
        type: String,
        required: false
    },
    countries: {
        type: Array,
        required: false
    },
    processing_time: {
        type: Array,
        required: false
    },
    free_shipping: {
        domestic: {
            type: Boolean,
            required: false
        },
        international: {
            type: Boolean,
            required: false
        }
    },
    shipping_price: {
        domestic: {
            type: Number,
            required: false
        },
        international: {
            type: Number,
            required: false
        }
    }
})


module.exports = mongoose.model('Shipping', shippingSchema)