
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
                    await Listing.findByIdAndUpdate(listingId, {
                        $push: {
                            attributes: newAttribute._id
                        }
                    })
                    return newAttribute
                })

            } catch (error) {
                throw new Error(`create attribute error=====>>> ${error}`)
            }

        },
        updateAttributes: async (_, { attributesListInput }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            console.log(attributesListInput)
            // try {
            //     return await Attribute.findByIdAndUpdate(attributeId,
            //         {
            //             $set: { ...attributesListInput }
            //         },
            //         { new: true }
            //     )
            // } catch (error) {
            //     throw new Error(`update attribute error=====>>>> ${error}`)
            // }
        },
        deleteAttributes: async (_, { attributeId_list }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            // try {
            //     await Attribute.findByIdAndDelete(attributeId)

            // } catch (error) {
            //     throw new Error(`delete attribute error=====>>>> ${error}`)
            // }
            return true
        }
    }
}





