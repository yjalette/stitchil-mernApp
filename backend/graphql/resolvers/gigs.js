const User = require("../../models/user");
const Gig = require("../../models/gig");
const { deleteFiles, multiUpload } = require("../../helpers/uploadToCloud");

module.exports = {
    Query: {
        view_gig: async (_, { id }, req) => {
            const gig = await Gig.findById(id);
            console.log(gig)
            return gig
        }
    },
    Mutation: {
        createGig: async (_, { itemInput, files }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            const newGig = await new Gig({ ...itemInput, createdAt: new Date(), creator: userId }).save();
            const gallery = await multiUpload(files, newGig._id);
            await newGig.updateOne({ gallery, coverImage: gallery[0] })
            await User.findByIdAndUpdate(userId, { $push: { gigs: newGig._id } })
            return true
        },
        updateGig: async (_, { itemInput, files }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            const gig = await Gig.findById(itemInput._id);
            if (itemInput.gallery.length < gig.gallery.length) await deleteFiles(gig.gallery.filter(elem => !itemInput.gallery.includes(elem)))
            if (files) gig.gallery = gig.gallery.concat(await multiUpload(files, userId))
            else await gig.updateOne({ $set: itemInput });
            await gig.save();
            return true;
        },
        deleteGig: async (_, { itemId }, { userId }) => {
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








