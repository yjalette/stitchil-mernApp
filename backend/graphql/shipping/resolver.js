const Shipping = require("../../models/shipping");
const Gig = require("../../models/gig");

module.exports = {
    Query: {
        shipping: async (_, { itemId }, req) => {
            const shipping = await Shipping.find({ itemId })
            return shipping
        }
    },
    Mutation: {
        createShipping: async (_, { shippingInput }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            const { itemId } = shippingInput
            const shipping = await new Shipping({
                ...shippingInput,
                item: itemId
            }).save();
            console.log(shipping)
            await Gig.findOneAndUpdate({ item: itemId }, { $push: { shipping_options: shipping._id } })
            return shipping
        },
        updateShipping: async (_, { shippingInput }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            return await Shipping.findOneAndUpdate({ _id: shippingInput._id }, shippingInput, { new: true })
        }
    }
}





