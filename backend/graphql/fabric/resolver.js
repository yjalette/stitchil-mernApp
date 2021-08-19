const { singleUpload, deleteSingleFile } = require("../../helpers/uploadToCloud");
const Fabric = require("../../models/fabric");
/**
 * @param {Object} filters 
 * @param {string} name
 * @returns {Object[]}
 */

module.exports = {
    Query: {
        fabrics: async (_, { ids }, { userId }) => {
            const fabrics = await Fabric.find({ _id: { $in: ids } })
            // console.log(fabrics)
            return fabrics
        },
        fabric_library: async (_, { }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            return await Fabric.find({ owner: userId })
        },
    },
    Mutation: {
        create_fabric: async (_, { fabricInput, file }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            const fabric = await new Fabric({
                ...fabricInput,
                owner: userId
            })
            const upload = await singleUpload(file, fabric._id, userId);
            fabric.image = upload;
            await fabric.save()
            return fabric
        },
        update_fabric: async (_, { fabricInput, file }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            const fabric = await Fabric.findById(fabricInput._id)
            if (fabricInput) await fabric.updateOne(fabricInput)
            if (file) {
                const upload = await singleUpload(file, fabric._id, userId);
                fabric.image = upload;
            }
            await fabric.save()
            return fabric
        },
        delete_fabric: async (_, { fabricId }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            try {
                const fabric = await Fabric.findById(fabricId)
                await deleteSingleFile({ url: fabric.image })
                await fabric.delete();
                return true
            } catch (error) {
                throw new Error(`fabric delete error: ${error}`)
            }
        }
    }
}





