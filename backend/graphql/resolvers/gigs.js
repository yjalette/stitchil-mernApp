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
        },
        profile_gigs: async (_, { username }, req) => {
            console.log("gigs---->", username);
            const user = await User.findOne({ username }, { _id: 1 });
            return await Gig.find({ "creator": user._id }).sort({ createdAt: -1 });
        },
        filter_gigs: async (_, args, req) => {
            console.log("arguments:--->", args, req)
            if (args.keyWords) {
                return await Gig.find({
                    $text: { $search: args.keyWords }
                },
                    { score: { $meta: "textScore" } }
                ).sort({ score: { $meta: "textScore" }, "price": 1 })
            }

            const sortBy = args.sortBy ? args.sortBy : "price";
            const price = { $lt: args.maxPrice ? args.maxPrice : 1000, $gt: args.minPrice ? args.minPrice : 1 }
            // const garmentType = args.garmentType && { $in: args.garmentType };

            const garmentType = args.garmentType ? { $in: args.garmentType } : { $exists: true };

            const gigs = await Gig.find({ categories: { $in: args.categories }, garmentType, price }).limit(9).sort({ [sortBy]: 1, "createdAt": 1 }).populate(populateByUser)

            console.log("gigs filter--->", gigs)
            return gigs;
        }
    },
    Mutation: {
        createGig: async (_, { itemInput, files }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            // const gallery = await multiUpload(files, userId);
            const newGig = await new Gig({
                ...itemInput,
                coverImage: null,
                createdAt: new Date(),
                creator: userId
            }).save();
            await User.findByIdAndUpdate(userId, { $push: { gigs: newGig._id } })
            return true
        },
        updateGig: async (_, { itemInput, files }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            const gig = await Gig.findById(itemInput._id);
            // if (files) gig.updateOne({ $set: { gallery: [...gig.gallery, ...await multiUpload(files, userId)] } })
            await gig.updateOne({ $set: { ...itemInput } });
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








