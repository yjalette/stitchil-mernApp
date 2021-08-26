const Message = require("../../models/message");
const Chat = require("../../models/chat");
const User = require("../../models/user");
const { withFilter } = require('graphql-subscriptions');

module.exports = {
    Query: {
        chat: async (_, { chatId }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            const chat = await Chat.findById(chatId).populate({ path: "members" }).populate({ path: "messages" })
            console.log(chat);
            return chat
        },
        chat_rooms: async (_, args, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            return await Chat.find({ members: { $in: userId }, messages: { $ne: [] } })
                .populate({
                    path: "members",
                    match: {
                        _id: { $ne: userId }
                    },
                    select: "username profileImage",
                })
                .populate({
                    path: "messages",
                    populate: {
                        path: "sender",
                        select: "username -_id",
                    }
                })
                .then(chats => chats.map(chat => {
                    const { username, profileImage } = chat.members[0]
                    return {
                        _id: chat._id,
                        chatId: chat._id,
                        member: username,
                        chatImg: profileImage,
                        lastMessages: chat.messages
                    }
                }))
        }
    },
    Mutation: {
        send_chat_message: async (_, { message, to_username, from_username, chatId }, { userId, pubsub }) => {
            if (!userId) throw new Error("unauthenticated");
            const user2 = await User.findOne({ username: to_username });
            if (!user2) throw new Error("user doesn't exist");
            const newMessage = await new Message({
                message,
                sender: userId,
                createdAt: new Date()
            })
            if (chatId) {
                newMessage.chatId = chatId;
                await Chat.findByIdAndUpdate(chatId, {
                    $push: { messages: newMessage._id },
                    updatedAt: new Date()
                })
            }
            if (!chatId) {
                const newChat = await createChat([userId, user2._id], newMessage._id)
                newMessage.chatId = newChat._id
            }
            await newMessage.save()
            try {
                const result = {
                    ...newMessage._doc,
                    sender: {
                        username: from_username
                    }
                }
                pubsub.publish('CHAT_NEW_MESSAGE', { chat_new_message: result });
                return result
            } catch (error) {
                throw Error(error)
            }

        },
        sendChatMessage: async (_, { message, to_username, from_username, chatId }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            const user2 = await User.findOne({ username: to_username });
            if (!user2) throw new Error("user doesn't exist");
            const newMessage = await new Message({
                chatId,
                message,
                sender: userId,
                createdAt: new Date()
            })
            if (chatId) {
                newMessage.chatId = chatId;
                await Chat.findByIdAndUpdate(chatId, {
                    $push: { messages: newMessage._id },
                    updatedAt: new Date()
                })
            }
            if (!chatId) {
                const newChat = await createChat([userId, user2._id], newMessage._id)
                newMessage.chatId = newChat._id
            }
            await newMessage.save()
            try {
                const result = {
                    ...newMessage._doc,
                    sender: {
                        username: from_username
                    }
                }
                pubsub.publish('CHAT_NEW_MESSAGE', { chat_new_message: result });
                return result
            } catch (error) {
                throw Error(error)
            }

        },
        delete_chat_message: async (_, { messageId }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            try {
                await Message.findByIdAndDelete(messageId)
                return true;
            } catch (error) {
                throw new Error(error)
            }
        },
        delete_chat: async (_, { chatId }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            try {
                await Chat.findById(chatId).deleteOne();
                return true;
            } catch (error) {
                throw new Error(error)
            }

        },
    },
    Subscription: {
        chat_new_message: {
            subscribe: withFilter(
                (_, args, { pubsub }) => {
                    return pubsub.asyncIterator(['CHAT_NEW_MESSAGE'])
                },
                ({ chat_new_message }, { chatId }) => {
                    return chat_new_message.chatId === chatId;
                },
            ),
        }
    }
}

async function createChat(members, messageId) {
    return await new Chat({
        members,
        messages: messageId,
        updatedAt: new Date(),
        createdAt: new Date()
    }).save();
}




