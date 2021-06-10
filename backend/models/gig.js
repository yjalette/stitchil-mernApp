const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gigSchema = new Schema({
    item: {
        type: Schema.Types.ObjectId,
        ref: 'Item'
    },
    variants: [
        {
            price: {
                type: Number,
                required: false
            },
            fabric: {
                type: Array,
                required: false
            },
            color: {
                type: Array,
                required: false
            },
            delivery: {
                type: Number,
                required: false
            }
        }
    ],
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    updatedAt: {
        type: Date,
        required: false
    },
    createdAt: {
        type: Date,
        required: true
    }
})


module.exports = mongoose.model('Gig', gigSchema)