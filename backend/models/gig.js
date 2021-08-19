const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gigSchema = new Schema({
    item: {
        type: Schema.Types.ObjectId,
        ref: 'Item'
    },
    packages: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Package'
        }
    ],
    shipping_options: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Shipping'
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