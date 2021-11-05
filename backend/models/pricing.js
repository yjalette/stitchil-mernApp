const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pricingSchema = new Schema({
    listingId: {
        type: Schema.Types.ObjectId,
        ref: 'Listing'
    },
    price: {
        type: Number,
        required: false
    },
    acceptingOffers: {
        type: Boolean,
        required: false
    }
})


module.exports = mongoose.model('Pricing', pricingSchema)