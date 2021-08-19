const Message = require("../../models/message");

const User = require("../../models/user");

module.exports = {
    Query: {
        project: async (_, args, { projectId }) => {
            if (!userId) throw new Error("unauthenticated");
        }
    },
    // Mutation: {
    //     projectSendMessage: async (_, { messageInput, projectId }, { userId }) => {
    //         if (!userId) throw new Error("unauthenticated");

    //         const newMessage = await new Message({
    //             ...messageInput,
    //             chatId: projectId,
    //             sender: userId,
    //             createdAt: new Date()
    //         })


    //     }
    // },
}






