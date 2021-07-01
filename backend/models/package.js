const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const packageSchema = new Schema({
    itemId: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false
    },
    swatches: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Swatch'
        }
    ],
    delivery: {
        type: Number,
        required: false
    },
    description: {
        type: String,
        required: false
    }
})


module.exports = mongoose.model('Package', packageSchema)