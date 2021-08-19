const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const addressSchema = new Schema({
    address1: {
        type: String,
        required: false
    },
    address2: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    zip: {
        type: Number,
        required: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        required: false
    }
})

module.exports = mongoose.model("Address", addressSchema);