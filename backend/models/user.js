const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    googleAuth: {
        type: Boolean,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: false
    },
    languages: {
        type: Array,
        required: false
    },
    about: {
        type: String,
        required: false
    },
    country: {
        type: Array,
        required: false
    },
    role: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        required: false
    },
    coverImage: {
        type: String,
        required: false
    },
    designer: {
        type: Schema.Types.ObjectId,
        ref: 'Designer'
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }],
    rating: {
        type: Number,
        required: false
    },
    createdAt: {
        type: Date,
        required: false
    },
    lastSeen: {
        type: Date,
        required: false
    },
    verifiedEmail: {
        type: Boolean
    }
})

module.exports = mongoose.model("User", userSchema)