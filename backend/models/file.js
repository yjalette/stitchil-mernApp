const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fileSchema = new Schema({
    docId: {
        type: String,
        required: true
    },
    public_id: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    imageUrl: {
        type: String,
        required: false
    },
    likes: [
        {
            type: String,
            required: false
        }
    ]
    ,
    createdAt: {
        type: Date,
        required: false
    },
    updatedAt: {
        type: Date,
        required: false
    }
}
)


module.exports = mongoose.model('File', fileSchema)