const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gallerySchema = new Schema({
    public_id: {
        type: String,
        required: false
    },
    docId: {
        type: String,
        required: false
    },
    url: {
        type: String,
        required: false
    },
    coverImage: {
        type: Boolean,
        required: false
    },
    createdAt: {
        type: Date,
        required: false
    }
})


module.exports = mongoose.model('File', gallerySchema)