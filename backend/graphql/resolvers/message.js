const User = require("../../models/user");
const Message = require("../../models/message");
const Chat = require("../../models/chat");
const { transformUsersIds } = require("./merge");
const { sendEmail } = require("../../helpers/nodemailer");
const user = require("../../models/user");


module.exports = {
    Query: {
        messages: async (_, { username }, { userId }) => {
            const user2 = await User.findOne({ username });
            const messages = await Message.find({ sender: userId || user2._id, recipient: user2._id || userId }).populate("sender").populate("recipient")
            // const { messages } = await Chat.findById(docId, { "messages": { $slice: 2 } }).populate({ path: "messages", populate: "sender" })
            console.log(messages)
            return messages;
        },
        likes: async (_, { docId, docName }, req) => {
            try {
                switch (docName) {
                    case "portfolio": {
                        // const portfolio = await Portfolio.findOne({ 'gallery._id': docId });
                        const { likes } = portfolio.gallery.id(docId);
                        return transformUsersIds(likes);
                    }
                }
                return true
            } catch (error) {
                throw new Error(error)
            }
        }
    },
    Mutation: {
        createMessage: async (_, { message, recipient }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            const user2 = await User.findOne({ username: recipient });
            const chat = await Chat.findOne({ members: { $all: [user2, userId] } });
            const newMessage = await new Message({ message, sender: userId, recipient: user2._id, createdAt: new Date() }).save();
            if (chat) {
                chat.messages = [newMessage._id, ...chat.messages];
                chat.save();
            }
            else await new Chat({
                members: [userId, user2],
                messages: [newMessage._id],
                createdAt: new Date()
            }).save();
            return newMessage;
        },
        deleteMessage: async (_, { itemId }, req) => {
            try {
                await Message.findByIdAndRemove(itemId);
                return true
            } catch (error) {
                throw new Error(error)
            }
        },
        createReview: async (_, { message, recipient, rating }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            const newReview = await new Message({
                message,
                rating,
                sender: userId,
                createdAt: new Date()
            }).save();
            await User.findOneAndUpdate({ username: recipient }, { $push: { reviews: newReview._id }, $inc: { rating } })
            return true;
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



