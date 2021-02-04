const User = require("../../models/user");
const Gig = require("../../models/gig");
const File = require("../../models/file");
const { saveFile, deleteFile, multiUpload } = require("../../helpers/uploadToCloud");
const { populateByUser } = require("../../consts/user");


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
            const gallery = await multiUpload(files, userId);
            console.log(gallery)
            const newGig = await new Gig({
                ...itemInput,
                gallery,
                coverImage: gallery[0],
                createdAt: new Date(),
                creator: userId
            }).save();
            await User.findByIdAndUpdate(userId, { $push: { gigs: newGig._id } })
            return true
        },
        updateGig: async (_, { itemInput, files }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            const gig = await Gig.findById(itemInput._id);
            if (files) gig.gallery = gig.gallery.concat(await multiUpload(files, userId))
            else await gig.updateOne({ $set: itemInput });
            await gig.save();
            return true;
        },
        deleteGig: async (_, { itemId }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            try {
                await deleteFile(`${userId}/${itemId}`);
                await Gig.findByIdAndDelete(itemId);
                await User.findByIdAndUpdate(userId, { $pull: { gigs: itemId } })
                return true;
            } catch (error) {
                throw new Error(error)
            }

        }
    }

}








