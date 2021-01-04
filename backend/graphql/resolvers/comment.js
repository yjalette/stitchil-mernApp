const User = require("../../models/user");
const Comment = require("../../models/comment");

module.exports = {
    Query: {
        comments: async (_, { docId }, req) => await Comment.find({ docId }).populate({ path: "sender", select: "username profileImage" }),
        profile_reviews: async (_, { username }, req) => {
            const user = await User.findOne({ username }, { _id: 1 });
            return await Comment.find({ docId: user._id }).populate({ path: "sender", select: "username profileImage" })
        }

    },
    Mutation: {
        createReview: async (_, { reviewInput, recipient }, req) => {
            if (!req.userId) throw new Error("unauthenticated");
            const user = await User.findOne({ username: recipient }, { _id: 1 });
            await new Comment({
                ...reviewInput,
                docId: user._id,
                sender: req.userId,
                createdAt: new Date()
            }).save();
            return true;
        },
        createComment: async (_, { message, docId }, req) => {
            if (!req.userId) throw new Error("unauthenticated");
            await new Comment({
                message,
                docId,
                sender: req.userId,
                createdAt: new Date()
            }).save();
            return true;
        },
        deleteComment: async (_, { itemId }, req) => {
            if (!req.userId) throw new Error("unauthenticated");
            await Comment.findByIdAndDelete(itemId);
            return true
        }


    }
}




