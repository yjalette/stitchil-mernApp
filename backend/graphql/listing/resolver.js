const Listing = require("../../models/listing");
const Variation = require("../../models/variation");
const File = require("../../models/file");
const { deleteSingleFile, multiUpload } = require("../../helpers/uploadToCloud");

module.exports = {
    Query: {
        listing: async (_, { listingId }, req) => {
            let listing = await Listing.findById(listingId)
                .populate({ path: "details" })
                .populate({ path: "variations" })
                .populate({ path: "shipping_options" })
            listing.gallery = await File.find({ docId: listingId });
            await Variation.deleteMany({ variationName: null })
            await Variation.deleteMany({ options: { $exists: true, $size: 0 } })
            return listing
        }
    },
    Mutation: {
        createListing: async (_, { productId, listingType }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            const newItem = new Listing({
                details: productId,
                listingType,
                creator: userId,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            try {
                await newItem.save();
                return newItem._id
            } catch (error) {
                throw new Error(`listing create error =====> ${error}`)
            }

        },
        updateListing: async (_, { listingInput }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            try {
                return true
            } catch (error) {
                console.log(error)
            }
        },
        publishListing: async (_, { listingId }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            try {
                await Listing.findByIdAndUpdate(listingId, { active: true })
            } catch (error) {
                throw new Error(`listing publish error =====> ${error}`)
            }
            return true
        },
        deleteListing: async (_, { listingId }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            try {
                await Listing.deleteOne({ _id: listingId })
                await File.deleteMany({ docId: listingId })
                return true;

            } catch (error) {
                throw new Error(error)
            }
        }
    }

}


