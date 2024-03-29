const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shippingSchema = new Schema({
    listingId: {
        type: String,
        required: false
    },
    shippingCarrier: {
        type: String,
        required: false
    },
    mailClass: {
        type: String,
        required: false
    },
    shippingPrice: {
        type: Number,
        required: false
    },
    freeShipping: {
        type: Boolean,
        required: false
    }
})


module.exports = mongoose.model('Shipping', shippingSchema)