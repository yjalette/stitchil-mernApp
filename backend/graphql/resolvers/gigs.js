const User = require("../../models/user");
const Gig = require("../../models/gig");
const { deleteFiles, multiUpload } = require("../../helpers/uploadToCloud");

module.exports = {
    Query: {
        explore_gigs: async (_, { filters, page }, req) => {
            if (filters && Object.values(filters).length > 0) {
                const items = await Gig.find({
                    $and: [
                        { category: filters.category && filters.category.length > 0 ? { $in: filters.category } : { $exists: true } },
                        { styles: filters.styles && filters.styles.length > 0 ? { $in: filters.styles } : { $exists: true } },
                        { price: { $lt: Number(filters.max) || 1000, $gt: Number(filters.min) || 1 } }
                    ]
                })
                    .populate({ path: "creator", select: "username country" })
                    .sort({ createdAt: -1 })
                    .limit(10)
                return { items, total: items.length }
            }

            return { items: await Gig.find().populate({ path: "creator", select: "username country" }).sort({ createdAt: -1 }).limit(10) }
        },
        search_gigs: async (_, { filters, page }, req) => {
            const items = await Gig.find(
                {
                    $text: { $search: filters.keywords },
                    $and: [
                        { category: filters.category && filters.category.length > 0 ? { $in: filters.category } : { $exists: true } },
                        { styles: filters.styles && filters.styles.length > 0 ? { $in: filters.styles } : { $exists: true } },
                        { price: { $lt: Number(filters.max) || 1000, $gt: Number(filters.min) || 1 } }
                    ]
                },
                { projection: { score: { $meta: "textScore" } } },
            ).sort({ score: { $meta: "textScore" } })
            return { items, total: items.length }
        },
        view_gigs_item: async (_, { id }, req) => {
            return await Gig.findById(id);
        }
    },
    Mutation: {
        create_gigs_item: async (_, { itemInput, files }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            const newGig = await new Gig({ ...itemInput, createdAt: new Date(), creator: userId }).save();
            const gallery = await multiUpload(files, newGig._id);
            await newGig.updateOne({ gallery, coverImage: gallery[0] })
            await User.findByIdAndUpdate(userId, { $push: { gigs: newGig._id } })
            return newGig
        },
        update_gigs_item: async (_, { itemInput, files }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            const gig = await Gig.findById(itemInput._id);
            if (itemInput.gallery.length < gig.gallery.length) await deleteFiles(gig.gallery.filter(elem => !itemInput.gallery.includes(elem)))
            if (files) gig.gallery = gig.gallery.concat(await multiUpload(files, userId))
            else await gig.updateOne({ $set: itemInput });
            await gig.save();
            return true;
        },
        delete_gigs_item: async (_, { itemId }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            try {
                const gig = await Gig.findById(itemId);
                await deleteFiles(gig.gallery);
                await gig.deleteOne();
                await User.findByIdAndUpdate(userId, { $pull: { gigs: itemId } })
                return true;
            } catch (error) {
                throw new Error(error)
            }

        }
    }

}








