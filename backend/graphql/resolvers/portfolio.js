const Portfolio = require("../../models/portfolio");
const User = require("../../models/user");
const File = require("../../models/file");
const { transformPortfolio } = require("./merge");
const { populateByUser } = require("../../consts/user");
const { saveFile, deleteFile } = require("../../helpers/uploadToCloud");

module.exports = {
    Query: {
        designerResume: async (_, { portfolioId }, req) => {
            return await Portfolio.findById(portfolioId);
        },
        profile_portfolio: async (_, { username }, req) => {
            const { portfolio } = await User.findOne({ username }, { portfolio: 1 });
            if (!portfolio) return null;
            return await File.find({ docId: portfolio }).sort({ createdAt: -1 })
        },
        filter_talents: async (_, args, req) => {
            console.log(args);
            let result;
            const specialties = args.specialties ? { $in: args.specialties } : { $exists: true };
            const experience = args.experience ? { $in: args.experience } : { $exists: true };
            if (args.categories) result = await Portfolio.find({ skills: { $in: args.categories }, specialties, experience }).populate(populateByUser)
            return result && result.map(portfolio => transformPortfolio(portfolio))
        },
    },
    Mutation: {
        updateDesigner: async (_, { designerInput }, req) => {
            try {
                const portfolio = await Portfolio.findOne({ creator: req.userId });
                console.log(portfolio)
                await portfolio.updateOne({ $set: { ...designerInput } }, { new: true });

                portfolio.save()

            } catch (error) {
                throw new Error(error)
            }

            return true
        },
        createPortfolioItem: async (_, { itemInput, file }, req) => {
            console.log(":input---->", itemInput)
            if (!req.userId) throw new Error("unauthenticated");
            const user = await User.findById(req.userId, { portfolio: 1 });
            console.log(":portf---->", user)
            await saveFile(new File({ docId: user.portfolio, creator: req.userId, createdAt: new Date(), ...itemInput }), file, req.userId);
            return true
        },
        updatePortfolioItem: async (_, { itemInput, file, itemId }, req) => {
            if (!req.userId) throw new Error("unauthenticated");
            if (file) saveFile(await File.findById(itemId), file, req.userId);
            if (itemInput) await File.updateOne({ _id: itemId }, { $set: { ...itemInput } })
        },

        deletePortfolioItem: async (_, { itemId }, req) => {
            if (!req.isUser) throw new Error("unauthenticated user to delete this file");
            await deleteFile(`${req.userId}/${itemId}`);
            await File.findByIdAndDelete(itemId);
            return true
        },
        likePortfolioItem: async (_, { docId, username }, req) => {
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
