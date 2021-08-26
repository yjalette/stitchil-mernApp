const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    item: {
        type: Schema.Types.ObjectId,
        ref: 'Item'
    },
    package: {
        type: Schema.Types.ObjectId,
        ref: 'Package'
    },
    fabric: {
        type: Schema.Types.ObjectId,
        ref: 'Fabric'
    },
    buyer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    orderStatus: {
        type: String,
        required: false
    },
    chat: {
        type: Schema.Types.ObjectId,
        ref: 'Chat'
    },
    payment: {
        type: Boolean,
        required: false
    },
    paymentConfirmed: {
        type: Boolean,
        required: false
    },
    shipping: {
        type: Schema.Types.ObjectId,
        ref: 'Shipping'
    },
    shippingAddress: {
        type: Schema.Types.ObjectId,
        ref: 'Address'
    },
    createdAt: {
        type: Date,
        required: true
    }
})


module.exports = mongoose.model('Order', orderSchema)