const Message = require("../../models/message");
const Chat = require("../../models/chat");
const User = require("../../models/user");
const { multiUpload } = require("../../helpers/uploadToCloud");
const { withFilter } = require('graphql-subscriptions');

module.exports = {
    Query: {
        messageList: async (_, { chatId }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            const messages = await Message.find({ chatId }).populate({ path: "sender" })
            // console.log(messages);
            return messages
        }
    },
    Mutation: {
        sendMessage: async (_, { message, attachments, chatId }, { userId, pubsub }) => {
            if (!userId) throw new Error("unauthenticated");
            const sender = await User.findById(userId);
            const newMessage = await new Message({
                message,
                chatId,
                sender: userId,
                createdAt: new Date()
            })
            if (attachments && attachments.length > 0) {
                const uploads = await multiUpload(attachments, chatId, userId);
                newMessage.attachments = uploads
            }
            await newMessage.save();

            try {
                const result = {
                    ...newMessage._doc,
                    sender: {
                        username: sender.username
                    }
                }
                console.log(result)
                pubsub.publish('NEW_MESSAGE', { newMessage: result });
                return result
            } catch (error) {
                throw Error(error)
            }


        },
    },
    Subscription: {
        newMessage: {
            subscribe: withFilter(
                (_, args, { pubsub }) => {
                    console.log("args", args)
                    return pubsub.asyncIterator(['NEW_MESSAGE'])
                },
                ({ newMessage }, { chatId }) => {
                    console.log("newsub", newMessage)
                    return newMessage.chatId === chatId;
                },
            ),
        }
    }
}





