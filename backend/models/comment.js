const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const commentSchema = new Schema({
    docId: {
        type: String,
        required: false
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    recipient: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    subject: {
        type: String,
        required: false
    },
    message: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        required: false
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

module.exports = mongoose.model('Comment', commentSchema);