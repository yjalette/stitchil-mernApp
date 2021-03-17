const Item = require("../../models/item");
const { deleteFiles, multiUpload } = require("../../helpers/uploadToCloud");

module.exports = {
    Query: {
        item: async (_, { itemId }, req) => {
            return await Item.findById(itemId)
        }
    },
    Mutation: {
        create_item: async (_, { itemInput, files, group }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            const newItem = await new Item({
                ...itemInput,
                active: false,
                group,
                creator: userId,
                createdAt: new Date(),
                updatedAt: new Date()
            }).save();
            const gallery = await multiUpload(files, newItem._id);
            await newItem.updateOne({ gallery, coverImage: gallery[0] })
            return newItem
        },
        update_item: async (_, { itemInput, files }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            const item = await Item.findById(itemInput._id);
            if (itemInput.gallery.length < item.gallery.length) await deleteFiles(item.gallery.filter(elem => !itemInput.gallery.includes(elem)))
            if (files) item.gallery = item.gallery.concat(await multiUpload(files, userId))
            else await item.updateOne({ $set: { ...itemInput, updatedAt: new Date() } });
            await item.save();
            return true;
        },
        delete_item: async (_, { itemId }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            try {
                const item = await Item.findById(itemId);
                await deleteFiles(item.gallery);
                await item.deleteOne();
                return true;
            } catch (error) {
                throw new Error(error)
            }
        }
    }

}
