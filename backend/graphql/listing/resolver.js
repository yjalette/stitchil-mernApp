const Listing = require("../../models/listing");
const Variation = require("../../models/variation");
const Attribute = require("../../models/attribute");
const File = require("../../models/file");
const { deleteSingleFile, multiUpload } = require("../../helpers/uploadToCloud");

module.exports = {
    Query: {
        listing: async (_, { listingId }, req) => {
            let listing = await Listing.findById(listingId)
                .populate({ path: "details" })
                .populate({ path: "attributes" })
                .populate({ path: "variations" })
                .populate({ path: "shipping_options" })
            listing.gallery = await File.find({ docId: listingId }).sort({ order: 1 });
            return listing
        }
    },
    Mutation: {
        createListing: async (_, { productId, listingType, listingAttributes }, { userId }) => {
            // await Listing.deleteMany()
            if (!userId) throw new Error("unauthenticated");
            const newListing = new Listing({
                details: productId,
                listingType,
                creator: userId,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            listingAttributes.map(async attr => {
                const attribute = await new Attribute({
                    attributeName: attr,
                    attributeValue: "n/a",
                    listingId: newListing._id
                }).save()
                await newListing.updateOne({
                    $push: {
                        attributes: attribute._id
                    }
                })
            })
            try {
                await newListing.save();
                return newListing._id
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
        updateListingGallery: async (_, { reorderedGalleryIds, deletedGalleryIds, newUploads }, { userId }) => {

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


