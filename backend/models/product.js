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
    implementation: {
        type: String,
        required: false
    },
    garment: {
        type: String,
        required: false
    },
    category: {
        type: Array,
        required: false
    },
    occasion: {
        type: Array,
        required: false
    },
    attributes: {
        color: {
            type: String,
            required: false
        },
        fabric: {
            name: {
                type: String,
                required: false
            },
            note: {
                type: String,
                required: false
            }
        },
        customAttributes: [
            {
                attributeName: {
                    type: String,
                    required: false
                },
                attributeValue: {
                    type: String,
                    required: false
                },
            }
        ]
    },
    updatedAt: {
        type: Date,
        required: false
    }
})

module.exports = mongoose.model('Product', productSchema)