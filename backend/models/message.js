const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    chatId: {
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
    message: {
        type: String,
        required: false
    },
    attachments: [
        {
            type: String,
            required: false
        }
    ],
    type: {
        type: String,
        required: false
    },
    seen: {
        type: Boolean,
        required: false
    },
    createdAt: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('Message', messageSchema);