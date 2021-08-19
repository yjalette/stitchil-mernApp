const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fabricSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    color: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: false
    },
    sample: {
        type: Boolean,
        required: false
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Fabric', fabricSchema)