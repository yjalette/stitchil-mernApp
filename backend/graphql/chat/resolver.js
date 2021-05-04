const Message = require("../../models/message");
const Chat = require("../../models/chat");
const User = require("../../models/user");
const { getObjectId } = require("../../helpers/transform");
const { withFilter, postController } = require('graphql-subscriptions');

// const chat_messages = []
const subscribers = [];
const onMessagesUpdates = (fn) => subscribers.push(fn);

module.exports = {
    Query: {
        chat_messages: async (_, { chatId }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            return await Message.find({ chatId })
                .populate({ path: "sender", select: "username -_id" })
        },
        chat_rooms: async (_, args, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            const chats = await Chat.aggregate([
                {
                    $match:
                        { 'members': getObjectId(userId) },
                },
                {
                    "$sort": {
                        "createdAt": -1
                    }
                },
                {
                    "$unwind": {
                        "path": "$members"
                    }
                },
                {
                    $match:
                        { 'members': { $ne: getObjectId(userId) } },
                },
                {
                    "$lookup": {
                        "from": "messages",
                        "localField": "messages",
                        "foreignField": "_id",
                        "as": "lastMessage",
                    }
                },
                {
                    "$sort": {
                        "lastMessage.createdAt": -1
                    }
                },
                {
                    "$unwind": {
                        "path": "$lastMessage",
                        "preserveNullAndEmptyArrays": true
                    }
                },
                {
                    "$lookup": {
                        "from": "users",
                        "localField": "members",
                        "foreignField": "_id",
                        "as": "member",
                    }
                },
                {
                    "$unwind": {
                        "path": "$member",
                        "preserveNullAndEmptyArrays": true
                    }
                },
                {
                    "$group": {
                        "_id": "$member.username",
                        "member": {
                            "$first": "$member.username",
                        },
                        "chatImg": {
                            "$first": "$member.profileImage",
                        },
                        "lastMessage": {
                            "$last": "$lastMessage.message"
                        },
                        "chatId": {
                            "$last": "$_id"
                        },
                        "updatedAt": {
                            "$first": "$lastMessage.createdAt"
                        }
                    }
                },
                {
                    "$project": {
                        "_id": 1,
                        "chatId": 1,
                        "member": 1,
                        "chatImg": 1,
                        "lastMessage": 1,
                        "updatedAt": 1,
                    }
                }

            ])
            // console.log("chat rooms---->", chats)
            return chats
        },
    },
    Mutation: {
        send_chat_message: async (_, { message, recipient, chatId }, { userId, pubsub }) => {
            const sender = await User.findById(userId, { _id: 0, username: 1 })
            const newMessage = new Message({
                message,
                sender: userId,
                createdAt: new Date()
            })
            if (chatId) newMessage.chatId = chatId;
            else if (!chatId && recipient) {
                const user2 = await User.findOne({ username: recipient }, { _id: 1 });
                const members = [userId, user2._id];
                const chat = await Chat.findOne({ members })
                if (chat) newMessage.chatId = chat._id;
                else {
                    const newChat = createChat(members);
                    newMessage.chatId = newChat._id;
                }
            }
            try {
                await newMessage.save();
                const result = {
                    ...newMessage._doc,
                    sender
                }
                pubsub.publish('CHAT_MESSAGES', {
                    chat_messages: result
                });
                return result
            } catch (error) {
                throw Error(error)
            }

        },
        delete_chat_message: async (_, { messageId }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            console.log(messageId)
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
        // chat_messages: {
        //     subscribe: (_, { chatId }, { pubsub }) => console.log(chatId) && pubsub.asyncIterator(['CHAT_MESSAGES'])
        // },
        chat_messages: {
            subscribe: withFilter(
                (_, { chatId }, { pubsub }) => {
                    console.log("tut--->", chatId)
                    // onMessagesUpdates(() => pubsub.publish(chatId, { chat_messages: latest }));
                    return pubsub.asyncIterator(['CHAT_MESSAGES'])
                },
                ({ chat_messages }, { chatId }, context) => {
                    console.log("payt", chat_messages.chatId, "var----> ", chatId)
                    // console.log(chat_messages.chatId === chatId)
                    return chat_messages.chatId === chatId;
                },
            )
        }
    },


}

async function createChat(members) {
    return await new Chat({
        members,
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


