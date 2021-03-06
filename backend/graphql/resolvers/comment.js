const User = require("../../models/user");
const Comment = require("../../models/comment");

module.exports = {
    Query: {
        comments: async (_, { docId }, req) => await Comment.find({ docId }).populate({ path: "sender", select: "username profileImage" }),
    },
    Mutation: {
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




