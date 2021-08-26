const Message = require("../../models/message");
const Chat = require("../../models/chat");
const User = require("../../models/user");
const { withFilter } = require('graphql-subscriptions');

module.exports = {
    Mutation: {
        sendMessage: async (_, { message, chatId }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");

            const newMessage = await new Message({
                message,
                chatId,
                sender: userId,
                createdAt: new Date()
            })

            await Chat.findByIdAndUpdate(chatId, {
                $push: { messages: newMessage._id },
                updatedAt: new Date()
            })

            await newMessage.save()
            try {
                const result = {
                    ...newMessage._doc,
                    sender: {
                        username: from_username
                    }
                }
                // pubsub.publish('CHAT_NEW_MESSAGE', { chat_new_message: result });
                return result
            } catch (error) {
                throw Error(error)
            }

        },
    }
}





