const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bidSchema = new Schema({
    bidder: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    price: {
        type: Number,
        required: false
    },
    createdAt: {
        type: Date,
        required: true
    }
})


module.exports = mongoose.model('Bid', bidSchema)