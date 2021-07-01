const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const swatchSchema = new Schema({
    fabric: {
        type: Array,
        required: false
    },
    color: {
        type: Array,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    sample: {
        type: Boolean,
        required: false
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Swatch', swatchSchema)