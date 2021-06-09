const Message = require("../../models/message");
const Chat = require("../../models/chat");
const User = require("../../models/user");
const { withFilter } = require('graphql-subscriptions');

module.exports = {
    Query: {
        chat_rooms: async (_, args, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            // await Chat.deleteMany()
            // await Message.deleteMany()
            const chats = await Chat.find({ members: { $in: userId }, messages: { $ne: [] } })
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
                        lastMessages: chat.messages.slice(-5)
                    }
                }))

            return chats
        }
    },
    Mutation: {
        // create_chat: async (_, { member, message }, { userId }) => {
        //     if (!userId) throw new Error("unauthenticated");
        //     const user2 = await User.findOne({ username: member })
        //     const newMessage = await new Message({
        //         message,
        //         sender: userId,
        //         recipient: user2._id,
        //         createdAt: new Date()
        //     })
        //     const newChat = await new Chat({
        //         members: [userId, user2._id],
        //         messages: newMessage._id,
        //         createdAt: new Date()
        //     }).save();
        //     newMessage.chatId = newChat._id
        //     await newMessage.save()
        //     return newChat._id
        // },
        send_chat_message: async (_, { message, recipient, chatId }, { userId, pubsub }) => {
            if (!userId) throw new Error("unauthenticated");
            const sender = await User.findById(userId, { username: 1 });
            const user2 = await User.findOne({ username: recipient });
            const newMessage = await new Message({
                message,
                sender: userId,
                recipient: user2._id,
                createdAt: new Date()
            })
            // console.log(user2._id, newMessage)
            if (chatId) {
                newMessage.chatId = chatId;
                await Chat.findByIdAndUpdate(chatId, { $push: { messages: newMessage._id } })
            }
            if (!chatId) {
                const newChat = await createChat([userId, user2._id], newMessage._id)
                console.log(newChat)
                newMessage.chatId = newChat._id
            }
            await newMessage.save()
            try {
                const result = {
                    ...newMessage._doc,
                    sender,
                    recipient: {
                        username: recipient
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
                    // console.log("tut2--->", args)
                    // onMessagesUpdates(() => pubsub.publish(chatId, { chat_messages: latest }));
                    return pubsub.asyncIterator(['CHAT_NEW_MESSAGE'])
                },
                ({ chat_new_message }, { username, chatId }, context) => {
                    console.log("payt2", chat_new_message, "var2----> ", chatId)
                    // console.log(chat_messages.chatId === chatId)
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
        createdAt: new Date()
    }).save();
}


// subscribe: withFilter(
//     (_, { chatId }, { pubsub }) => {
//         const latest = chat_messages.filter(msg => msg.chatId && msg.chatId === chatId)
//         // console.log("sub chatid--->", latest, chat_messages)
//         // const channel = Math.random().toString(36).slice(2, 15);
//         onMessagesUpdates(() => pubsub.publish(chatId, { chat_messages: latest }));
//         setTimeout(() => pubsub.publish(chatId, { chat_messages: latest }), 0);
//         return pubsub.asyncIterator(chatId);
//     },
//     (payload, { chatId }, context) => {
//         console.log("payt", payload, "var----> ", chatId)
//         return true;
//     },
// )


// create_chat: async (_, { message, recipient }, { userId }) => {
//     if (!userId) throw new Error("unauthenticated");
//     const user2 = await User.findOne({ username: recipient })
//     const newMessage = await Message({
//         message,
//         sender: userId,
//         recipient: user2._id,
//         createdAt: new Date()
//     }).save();
//     await new Chat({
//         members: [userId, user2._id],
//         messages: newMessage._id,
//         createdAt: new Date()
//     }).save();
//     return newMessage
// },



