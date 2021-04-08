const User = require("../../models/user");
const Message = require("../../models/message");
const Chat = require("../../models/chat");
const { sendEmail } = require("../../helpers/nodemailer");
const { getObjectId } = require("../../helpers/transform");

const message_query = (members) => {
    return ["sender", "recipient"].map(field => {
        return { [field]: { "$in": members } }
    })
}

module.exports = {
    Query: {
        messages: async (_, { member }, { userId }) => {
            const user2 = await User.findOne({ username: member });
            console.log("msg", message_query([getObjectId(userId), getObjectId(user2._id)]))
            const messages = await Message.aggregate([
                {
                    $match: {
                        $and: message_query([getObjectId(userId), getObjectId(user2._id)])
                    }
                },
                {
                    "$lookup": {
                        "from": "users",
                        "localField": "sender",
                        "foreignField": "_id",
                        "as": "sender",
                    }
                },
                {
                    "$unwind": {
                        "path": "$sender",
                        "preserveNullAndEmptyArrays": true
                    }
                },
                {
                    "$lookup": {
                        "from": "users",
                        "localField": "recipient",
                        "foreignField": "_id",
                        "as": "recipient",
                    }
                },
                {
                    "$unwind": {
                        "path": "$recipient",
                        "preserveNullAndEmptyArrays": true
                    }
                },

                {
                    "$group": {
                        "_id": "$_id",
                        "sender": {
                            "$first": "$sender.username",
                        },
                        "recipient": {
                            "$first": "$recipient.username",
                        },
                        "message": {
                            "$first": "$message",
                        },
                        "createdAt": {
                            "$first": "$createdAt"
                        }
                    }
                },
                {
                    "$project": {
                        "_id": 1,
                        "message": 1,
                        "sender": 1,
                        "recipient": 1,
                        "createdAt": 1,
                    }
                }

            ])
            console.log(messages)
            return messages
            // const query = ["sender", "recipient"]
            //     .map(member => {
            //         return { [member]: { $in: [userId, user2._id] } }
            //     })
            // return await Message.find({ $and: query })
        },
    },
    Mutation: {
        createMessage: async (_, { message, recipient, chatId }, { userId }) => {
            const member = await User.findOne({ username: recipient })
            const newMsg = await new Message({
                message,
                recipient: member,
                sender: userId,
                createdAt: new Date()
            }).save();
            if (chatId) await Chat
                .findByIdAndUpdate(chatId, {
                    $push: { messages: newMsg._id }
                })
            else {
                const chat = await Chat.findOne({ members: [member._id, userId] });
                if (chat) await chat.updateOne({
                    $push: { messages: newMsg._id }
                })
                else await new Chat({
                    members: [userId, member],
                    messages: newMsg,
                    createdAt: new Date()
                }).save()
            }
        },
        contactUs: async (_, { email, message, subject }, req) => {
            console.log(email, subject, message)
            try {
                if (!email && req.userId) {
                    const email = await User.findById(req.userId, { email: 1, _id: 0 });
                    email = user.email;
                }

                return await sendEmail({
                    subject,
                    template: "contact",
                    context: {
                        message
                    }
                })

            } catch (error) {
                throw new Error(error)
            }
        }
    }
}