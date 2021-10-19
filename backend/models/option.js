const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const optionSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    note: {
        type: String,
        required: false
    },
    imageId: {
        type: Schema.Types.ObjectId,
        ref: 'File'
    },
    priceIncrease: {
        type: Number,
        required: false
    },
    listingId: {
        type: Schema.Types.ObjectId,
        ref: 'Listing'
    }
})

module.exports = mongoose.model('Option', optionSchema)