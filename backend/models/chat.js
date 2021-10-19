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
    createdAt: {
        type: Date,
        required: false
    }
})


module.exports = mongoose.model("Chat", ChatSchema)
