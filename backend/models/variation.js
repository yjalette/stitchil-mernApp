const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const variationSchema = new Schema({
    variationName: {
        type: String,
        required: false
    },
    options: [
        {
            name: {
                type: String,
                required: false
            },
            note: {
                type: String,
                required: false
            },
            imageId: {
                type: String,
                required: false
            },
            priceIncrease: {
                type: Number,
                required: false
            }
        }

    ],
    listingId: {
        type: Schema.Types.ObjectId,
        ref: 'Listing'
    }
})

module.exports = mongoose.model('Variation', variationSchema)