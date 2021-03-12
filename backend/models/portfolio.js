const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const portfolioSchema = new Schema({
    item: {
        type: Schema.Types.ObjectId,
        ref: 'Item'
    },
    startingPrice: {
        type: Number,
        required: false
    },
    auction: {
        type: Boolean,
        required: false
    },
    bids: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Bid'
        }
    ],
    likes: [
        {
            type: String,
            required: false
        }
    ],
    createdAt: {
        type: Date,
        required: false
    },
    updatedAt: {
        type: Date,
        required: false
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}
)


module.exports = mongoose.model('Portfolio', portfolioSchema)