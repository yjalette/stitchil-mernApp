const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fabricSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    pattern: {
        type: String,
        required: false
    },
    imageId: {
        type: Schema.Types.ObjectId,
        ref: 'File'
    },
    content: {
        type: String,
        required: false
    },
    default: {
        type: Boolean,
        required: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
})

module.exports = mongoose.model('Fabric', fabricSchema)