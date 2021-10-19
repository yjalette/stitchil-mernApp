const Shipping = require("../../models/shipping");
const Listing = require("../../models/listing");

module.exports = {
    Query: {
        shipping: async (_, { itemId }, req) => {
            const shipping = await Shipping.find({ itemId })
            return shipping
        }
    },
    Mutation: {
        createShipping: async (_, { shippingInput, listingId }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            const shipping = await new Shipping({
                ...shippingInput,
                listingId
            }).save();
            console.log(shipping)
            await Listing.findByIdAndUpdate(listingId, { $push: { shipping_options: shipping._id } })
            return shipping
        },
        updateShipping: async (_, { shippingInput, shippingId }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            try {
                return await Shipping.findByIdAndUpdate(shippingId, shippingInput, { new: true })
            } catch (error) {
                throw new Error(`update shipping error=====>>>> ${error}`)
            }
        },
        deleteShipping: async (_, { shippingId }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            try {
                await Shipping.findByIdAndDelete(shippingId)
            } catch (error) {
                throw new Error(`delete shipping error=====>>>> ${error}`)
            }
            return true
        }
    }
}





