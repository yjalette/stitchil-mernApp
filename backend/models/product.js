const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    coverImage: {
        type: String,
        required: false
    },
    gallery: {
        type: Array,
        required: false
    },
    likes: [
        {
            type: String,
            required: false
        }
    ],
    createdAt: {
        type: Date,
        required: false
    },
    updatedAt: {
        type: Date,
        required: false
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}
)


module.exports = mongoose.model('Product', productSchema)