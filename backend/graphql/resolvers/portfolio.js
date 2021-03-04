const Portfolio = require("../../models/portfolio");
const User = require("../../models/user");
const File = require("../../models/file");
const { populateByUser } = require("../../consts/user");
const { deleteFiles, multiUpload } = require("../../helpers/uploadToCloud");

module.exports = {
    Query: {
        view_portfolio_item: async (_, { id }, req) => {
            return await Portfolio.findById(id).populate(populateByUser);
        }
    },
    Mutation: {
        create_portfolio_item: async (_, { itemInput, files }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            const gallery = await multiUpload(files, userId);
            const newPortfolio = await new Portfolio({
                ...itemInput,
                gallery,
                coverImage: gallery[0],
                creator: userId,
                createdAt: new Date(),
            }).save();
            await User.findByIdAndUpdate(userId, { $push: { portfolio: newPortfolio._id } })
            return newPortfolio
        },
        update_portfolio_item: async (_, { itemInput, files }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            const portfolio = await Portfolio.findById(itemInput._id);
            if (itemInput.gallery.length < portfolio.gallery.length) deleteFiles(portfolio.gallery.filter(elem => !itemInput.gallery.includes(elem)), portfolio._id)
            if (files) portfolio.gallery = portfolio.gallery.concat(await multiUpload(files, userId))
            else await portfolio.updateOne({ $set: itemInput });
            await portfolio.save();
        },
        delete_portfolio_item: async (_, { itemId }, { userId }) => {
            if (!userId) throw new Error("unauthenticated user to delete this file");
            const portfolio = await Portfolio.findById(itemId);
            if (deleteFiles(portfolio.gallery)) {
                await portfolio.deleteOne();
                await User.findByIdAndUpdate(userId, { $pull: { portfolio: itemId } })
            }
            return true
        },
        like_portfolio_item: async (_, { docId, username }, req) => {
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
