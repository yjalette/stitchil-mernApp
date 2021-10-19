
const { singleUpload, deleteSingleFile } = require("../../helpers/uploadToCloud");
const Variation = require("../../models/variation");
const Listing = require("../../models/listing");
/**
 * @param {Object} filters 
 * @param {string} name
 * @returns {Object[]}
 */

module.exports = {
    Mutation: {
        createVariation: async (_, { variationInput, listingId }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            try {
                const newVariation = await new Variation({
                    ...variationInput,
                    listingId
                }).save()
                await Listing.findByIdAndUpdate(listingId, {
                    $push: {
                        variations: newVariation._id
                    }
                })
                return newVariation
            } catch (error) {
                throw new Error(`create variation error=====>>> ${error}`)
            }

        },
        updateVariation: async (_, { variationInput, variationId }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            console.log(variationInput)
            try {
                return await Variation.findByIdAndUpdate(variationId,
                    {
                        $set: { ...variationInput }
                    },
                    { new: true }
                )
            } catch (error) {
                throw new Error(`update variation error=====>>>> ${error}`)
            }
        },
        deleteVariation: async (_, { variationId }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            try {
                await Variation.findByIdAndDelete(variationId)

            } catch (error) {
                throw new Error(`delete variation error=====>>>> ${error}`)
            }
            return true
        }
    }
}





