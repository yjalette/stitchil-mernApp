const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const designerSchema = new Schema({
    styles: {
        type: Array,
        required: false
    },
    skills: {
        type: Array,
        required: false
    },
    experience: {
        type: Array,
        required: false
    },
    education: {
        type: Array,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    updatedAt: {
        type: Date,
        required: false
    }
})


module.exports = mongoose.model('Designer', designerSchema)