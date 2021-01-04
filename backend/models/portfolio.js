const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const portfolioSchema = new Schema({
    style: {
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
    about: {
        type: String,
        required: false
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


module.exports = mongoose.model('Portfolio', portfolioSchema)