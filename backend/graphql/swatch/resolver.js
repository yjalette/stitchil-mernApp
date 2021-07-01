const { singleUpload, deleteSingleFile } = require("../../helpers/uploadToCloud");
const Swatch = require("../../models/swatch");
/**
 * @param {Object} filters 
 * @param {string} name
 * @returns {Object[]}
 */

module.exports = {
    Query: {
        swatches: async (_, { ids }, { userId }) => {
            const swatches = await Swatch.find({ _id: { $in: ids } })
            console.log(swatches)
            return swatches
        },
        swatch_library: async (_, { }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            return await Swatch.find({ owner: userId })
        },
    },
    Mutation: {
        create_swatch: async (_, { swatchInput, file }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            const swatch = await new Swatch({
                ...swatchInput,
                owner: userId
            })
            const upload = await singleUpload(file, swatch._id, userId);
            swatch.image = upload;
            await swatch.save()
            return swatch
        },
        update_swatch: async (_, { swatchInput, file }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            const swatch = await Swatch.findById(swatchInput._id)
            if (swatchInput) await swatch.updateOne(swatchInput)
            if (file) {
                const upload = await singleUpload(file, swatch._id, userId);
                swatch.image = upload;
            }
            await swatch.save()
            return swatch
        },
        delete_swatch: async (_, { swatchId }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            try {
                const swatch = await Swatch.findById(swatchId)
                await deleteSingleFile({ url: swatch.image })
                await swatch.delete();
                return true
            } catch (error) {
                throw new Error(`swatch delete error: ${error}`)
            }
        }
    }
}





