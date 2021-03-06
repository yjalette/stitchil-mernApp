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
            fabrics: {
                type: Array,
                required: false
            },
            colors: {
                type: Array,
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