const Item = require("../../models/item");
const Product = require("../../models/product");
const Gig = require("../../models/gig");
const { deleteFiles, multiUpload } = require("../../helpers/uploadToCloud");

module.exports = {
    Query: {
        item: async (_, { itemId }, req) => {

            return await Item.findById(itemId)
        }
    },
    Mutation: {
        create_item_overview: async (_, { itemInput, group }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            const newItem = await new Item({
                ...itemInput,
                group,
                active: false,
                creator: userId,
                createdAt: new Date(),
                updatedAt: new Date()
            }).save();
            await createDoc(newItem._id, group)
            return newItem._id
        },
        update_item_overview: async (_, { itemInput, itemId }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            try {
                await Item.findByIdAndUpdate(itemId, { $set: { ...itemInput, updatedAt: new Date() } })
                return true
            } catch (error) {
                console.log(error)
            }
        },
        create_item_gallery: async (_, { files, itemId }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            const item = await Item.findById(itemId)
            item.gallery = item.gallery.concat(await multiUpload(files, item._id, userId))
            await item.save();
            return true
        },
        update_item_gallery: async (_, { gallery, files, coverImage, itemId }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            const item = await Item.findById(itemId)
            if (coverImage) item.coverImage = coverImage
            if (gallery) {
                await deleteFiles(item.gallery
                    .filter(elem => !gallery.includes(elem)))
                item.gallery = gallery
            }
            if (files) {
                item.gallery = item.gallery
                    .concat(await multiUpload(files, itemId, userId))
            }
            await item.save();
            return item.gallery
        },
        update_item: async (_, { itemInput }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            return await Item.findByIdAndUpdate(itemInput._id, {
                $set: { ...itemInput, updatedAt: new Date() }
            });
        },
        publish_item: async (_, { itemId }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            await Item.findByIdAndUpdate(itemId, { active: true })
            return true
        },
        delete_item: async (_, { itemId }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            const item = await Item.findById(itemId);
            try {
                if (item.group === "gigs") await Gig.deleteOne({ item: itemId })
                else if (item.group === "portfolio") await Product.deleteOne({ item: itemId })
                await deleteFiles(item.gallery);
                await item.deleteOne();
                return true;

            } catch (error) {
                throw new Error(error)
            }
        }
    }

}


async function createDoc(itemId, group) {
    const newDoc = {
        item: itemId,
        createdAt: new Date(),
        updatedAt: new Date()
    }
    if (group === "gig") return await new Gig(newDoc).save()
    if (group === "product") return await new Product(newDoc).save()
}
