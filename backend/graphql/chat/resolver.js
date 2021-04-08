const Message = require("../../models/message");
const Chat = require("../../models/chat");
const { getObjectId } = require("../../helpers/transform");

module.exports = {
    Query: {
        chats: async (_, { }, { userId }) => {
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
                        "path": "$members",
                        // "includeArrayIndex": "arrayIndex"
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
                        // "pipeline": [
                        //     { $sort: { 'createdAt': 1 } },
                        //     { $limit: 1 }
                        // ],
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
                        },
                        // "chatId": {
                        //     "first": "$member.fullname"
                        // },
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
            return chats
        },
    },
    Mutation: {
        updateChat: async (_, { message, docId }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            const newMessage = await Message({
                message,
                sender: userId,
                createdAt: new Date()
            }).save();
            await Chat.findByIdAndUpdate(docId, { $push: { messages: newMessage._id } });
            return newMessage
        },
        deleteChat: async ({ chatId, msgId }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            try {
                if (msgId) {
                    const chat = await Chat.findById(chatId);
                    const fileToUpdate = await chat.messages.id(msgId);
                    await fileToUpdate.remove();
                    chat.save();
                }
                else await Chat.findById(chatId).deleteOne();
                return true;
            } catch (error) {
                throw new Error(error)
            }

        }
    }


}


// chats: async (_, { }, { userId }) => {
//     try {
//         // select most recent message
//         return await Chat.find({ members: { $in: userId } })
//             .populate({ path: 'members', select: 'username profileImage' })
//             .populate({ path: 'messages', populate: 'sender', options: { $sort: { "messages$createdAt": 1 } } })
//     } catch (error) {
//         throw new Error(error)
//     }
// },

// try {
//     const chats = await Message.aggregate([
//         {
//             $match: {
//                 $or: query
//             }
//         },
//         {
//             "$group": {
//                 "_id": "$recipient",
//                 "sender": {
//                     "$first": "$sender"
//                 },
//                 "recipient": {
//                     "$first": "$recipient"
//                 },
//                 "lastMessage": {
//                     "$first": "$message"
//                 },
//                 "createdAt": {
//                     "$first": "$createdAt"
//                 }
//             }
//         },
//         {
//             "$sort": {
//                 "createdAt": -1
//             }
//         },
//         {
//             "$lookup": {
//                 "from": "users",
//                 "localField": "sender",
//                 "foreignField": "_id",
//                 "as": "sender"
//             }
//         },
//         {
//             "$unwind": {
//                 "path": "$sender",
//                 "preserveNullAndEmptyArrays": true
//             }
//         },
//         {
//             "$lookup": {
//                 "from": "users",
//                 "localField": "recipient",
//                 "foreignField": "_id",
//                 "as": "recipient"
//             }
//         },
//         {
//             "$unwind": {
//                 "path": "$recipient",
//                 "preserveNullAndEmptyArrays": true
//             }
//         },
//         {
//             "$project": {
//                 "_id": 1,
//                 "lastMessage": 1,
//                 "createdAt": 1,
//                 "sender.profileImage": 1,
//                 "sender.username": 1,
//                 "recipient.profileImage": 1,
//                 "recipient.username": 1,
//                 "chatImg": 1
//             }
//         }

//     ])


