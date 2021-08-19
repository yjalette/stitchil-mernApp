const Address = require("../../models/address");

module.exports = {
    Query: {
        addressesUser: async (_, { onlyLatest }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            let addresses;
            if (onlyLatest) addresses = await Address
                .find({ user: userId })
                .sort({ "createdAt": -1 })
                .limit(1);
            else addresses = await Address.find({ user: userId })
            return addresses
        },
        addressLatest: async (_, { }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            const addresses = await Address
                .find({ user: userId })
                .sort({ "createdAt": -1 })
                .limit(1)
            return addresses[0]
        },
        address: async (_, { addressId }, req) => {
            const address = await Address.findById(addressId)
            return address
        }
    },
    Mutation: {
        createAddress: async (_, { addressInput }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            const address = await new Address({
                ...addressInput,
                user: userId,
                createdAt: new (Date)
            }).save();
            return address
        },
        updateAddress: async (_, { addressInput }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            return await Address.findOneAndUpdate({ _id: addressInput._id }, addressInput, { new: true })
        }
    }
}





