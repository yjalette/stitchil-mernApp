const Product = require("../../models/product");
const User = require("../../models/user");
const File = require("../../models/file");
const { populateByUser } = require("../../consts/user");
const { deleteFiles, multiUpload } = require("../../helpers/uploadToCloud");

module.exports = {
    Query: {
        view_product: async (_, { id }, req) => {
            return await Product.findById(id).populate(populateByUser);
        }
    },
    Mutation: {
        createProduct: async (_, { itemInput, files }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            const gallery = await multiUpload(files, userId);
            const newProduct = await new Product({
                ...itemInput,
                gallery,
                creator: userId,
                createdAt: new Date(),
            }).save();
            console.log(newProduct)
            await User.findByIdAndUpdate(userId, { $push: { portfolio: newProduct._id } })
            return true
        },
        updateProduct: async (_, { itemInput, files }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            const product = await Product.findById(itemInput._id);
            if (itemInput.gallery.length < product.gallery.length) deleteFiles(product.gallery.filter(elem => !itemInput.gallery.includes(elem)), product._id)
            if (files) product.gallery = product.gallery.concat(await multiUpload(files, userId))
            else await product.updateOne({ $set: itemInput });
            await product.save();
        },

        deleteProduct: async (_, { itemId }, { userId }) => {
            if (!userId) throw new Error("unauthenticated user to delete this file");
            const product = await Product.findById(itemId);
            if (deleteFiles(product.gallery)) {
                console.log("tut---------->")
                await Product.findByIdAndDelete(itemId);
                await User.findByIdAndUpdate(userId, { $pull: { portfolio: itemId } })
            }
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
