const Product = require("../../models/product");
const User = require("../../models/user");
const File = require("../../models/file");
const { populateByUser } = require("../../consts/user");
const { saveFile, deleteFile, singleUpload } = require("../../helpers/uploadToCloud");

module.exports = {
    Query: {
        view_product: async (_, { id }, req) => {
            return await Product.findById(id).populate(populateByUser);
        },
        profile_portfolio: async (_, { username }, req) => {
            const user = await User.findOne({ username }, { portfolio: 1 });
            const products = await Product.find({ creator: user._id }).sort({ createdAt: -1 })
            console.log(products)
            return products
        }
    },
    Mutation: {
        createProduct: async (_, { itemInput, file }, { userId }) => {
            console.log(":input---->", itemInput)
            if (!userId) throw new Error("unauthenticated");
            // const newImg = await singleUpload(file, req.userId);
            if (itemInput) {
                const newProduct = await new Product({
                    ...itemInput,
                    coverImage: null,
                    creator: userId,
                    createdAt: new Date(),
                }).save();

                await User.findOneAndUpdate(userId, { $push: { portfolio: newProduct._id } })
            }

            return true
        },
        updateProduct: async (_, { itemInput, file, itemId }, req) => {
            if (!req.userId) throw new Error("unauthenticated");
            if (file) saveFile(await File.findById(itemId), file, req.userId);
            if (itemInput) await File.updateOne({ _id: itemId }, { $set: { ...itemInput } })
        },

        deleteProduct: async (_, { itemId }, { userId }) => {
            if (!userId) throw new Error("unauthenticated user to delete this file");
            await deleteFile(`${userId}/${itemId}`);
            await Product.findByIdAndDelete(itemId);
            await User.findByIdAndUpdate(userId, { $pull: { portfolio: itemId } })
            return true
        },
        likeProduct: async (_, { docId, username }, req) => {
            if (!req.userId) throw new Error("unauthenticated");
            try {
                const item = await File.findById(docId);
                if (item.likes && item.likes.includes(username)) item.likes = item.likes.filter(like => like === username);
                else item.likes.push(username);
                item.save();

            } catch (error) {
                throw new Error(error)
            }

            return true

        }
    }

}
