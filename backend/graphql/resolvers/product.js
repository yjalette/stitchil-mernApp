const Product = require("../../models/product");
const User = require("../../models/user");
const File = require("../../models/file");
const { populateByUser } = require("../../consts/user");
const { saveFile, deleteFile, newUpload } = require("../../helpers/uploadToCloud");

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
        createProduct: async (_, { itemInput, file }, req) => {
            console.log(":input---->", itemInput)
            if (!req.userId) throw new Error("unauthenticated");
            const newImg = await newUpload(file, req.userId);
            if (newImg) {
                console.log(newImg)
                const newProduct = await new Product({
                    ...itemInput,
                    imageUrl: newImg,
                    coverImage: newImg,
                    gallery: [newImg],
                    creator: req.userId,
                    createdAt: new Date(),
                }).save();
                console.log(newProduct)
            }

            return true
        },
        updateProduct: async (_, { itemInput, file, itemId }, req) => {
            if (!req.userId) throw new Error("unauthenticated");
            if (file) saveFile(await File.findById(itemId), file, req.userId);
            if (itemInput) await File.updateOne({ _id: itemId }, { $set: { ...itemInput } })
        },

        deleteProduct: async (_, { itemId }, req) => {
            if (!req.isUser) throw new Error("unauthenticated user to delete this file");
            await deleteFile(`${req.userId}/${itemId}`);
            await File.findByIdAndDelete(itemId);
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
