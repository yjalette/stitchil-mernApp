const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const ChatSchema = new Schema({
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    ],
    messages: [
        {
            sender: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            message: {
                type: String,
                required: false
            },
            createdAt: {
                type: Date,
                required: true
            }
        }
    ],
    updatedAt: {
        type: Date,
        required: false
    },
    createdAt: {
        type: Date,
        required: false
    }
})


module.exports = mongoose.model("Chat", ChatSchema)
