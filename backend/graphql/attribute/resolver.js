
const Attribute = require("../../models/attribute");
const Listing = require("../../models/listing");
/**
 * @param {Object} filters 
 * @param {string} name
 * @returns {Object[]}
 */

module.exports = {
    Mutation: {
        createAttributes: async (_, { attributesListInput, listingId }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            try {
                return attributesListInput.map(async attr => {
                    const newAttribute = await new Attribute({
                        ...attr,
                        listingId
                    }).save()
                    await Listing.findByIdAndUpdate(
                        listingId,
                        { attributes: newAttribute._id }
                    )
                    return newAttribute
                })
            } catch (error) {
                throw new Error(`create attribute error=====>>> ${error}`)
            }

        },
        createAttribute: async (_, { attributeInput, listingId }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            try {
                const newAttribute = await new Attribute({
                    ...attributeInput,
                    listingId
                }).save()
                await Listing.findByIdAndUpdate(listingId, {
                    $push: {
                        attributes: newAttribute._id
                    }
                })
                return newAttribute

            } catch (error) {
                throw new Error(`create attribute error=====>>> ${error}`)
            }

        },
        updateAttribute: async (_, { attributeValue, attributeId }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            try {
                return await Attribute.findByIdAndUpdate(
                    attributeId,
                    { attributeValue },
                    { new: true }
                )
            } catch (error) {
                throw new Error(`update attribute error=====>>>> ${error}`)
            }
        },
        deleteAttributes: async (_, { attributeId_list }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            // try {
            //     await Attribute.findByIdAndDelete(attributeId)

            // } catch (error) {
            //     throw new Error(`delete attribute error=====>>>> ${error}`)
            // }
            // return true
        }
    }
}





