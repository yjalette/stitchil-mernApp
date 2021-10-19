const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const attributeSchema = new Schema({
    attributeName: {
        type: String,
        required: false
    },
    attributeValue: {
        type: String,
        required: false
    },
    note: {
        type: String,
        required: false
    },
    listingId: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Attribute', attributeSchema)