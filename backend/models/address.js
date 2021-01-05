const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const addressSchema = new Schema({
    address: {
        type: String,
        required: false
    },
    apt: {
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
        type: Array,
        required: false
    },
    zipCode: {
        type: Number,
        required: false
    }
})

module.exports = mongoose.model("Address", addressSchema);