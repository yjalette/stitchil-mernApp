const User = require("../../models/user");
const Chat = require("../../models/chat");


module.exports = {
    Query: {
        chats: async (_, { }, req) => {
            try {
                return await Chat.find({ members: { $in: req.userId } }, { 'messages': { $slice: 15 } })
                    .populate({ path: 'members', select: 'username profileImage' })
                    .populate({ path: 'messages.sender' })
                    .sort('-updatedAt')

                // , { "messages": { $slice: 5 } }

            } catch (error) {
                throw new Error(error)
            }

        },
    },
    Mutation: {
        createChat: async (_, { message, participant }, req) => {
            if (!req.isUser) throw new Error("unauthenticated");

            const user2 = await User.findOne({ username: participant }, { _id: 1 }).lean();
            const existingChat = await Chat.findOne({ members: { $all: [req.userId, user2._id] } });

            if (existingChat) {
                existingChat.messages.push({
                    message,
                    sender: req.userId,
                    createdAt: new Date()
                })
                existingChat.updatedAt = new Date();
                existingChat.save()
            }

            if (!existingChat) await new Chat({
                members: [req.userId, user2._id],
                messages: [{
                    message,
                    sender: req.userId,
                    createdAt: new Date()
                }],
                updatedAt: new Date(),
                createdAt: new Date()
            }).save();

            return true
        },
        createMessage: async (_, { message, docId }, req) => {
            if (!req.userId) throw new Error("unauthenticated");
            console.log(message, docId, req.userId)
            const chat = await Chat.findById(docId);
            chat.messages = [{ message, sender: req.userId, createdAt: new Date() }, ...chat.messages];
            chat.updatedAt = new Date();
            await chat.save();
            return true;
        },
        deleteMessage: async (_, { itemId }, req) => {
            try {
                await Message.findByIdAndRemove(itemId);
                return true
            } catch (error) {
                throw new Error(error)
            }
        },
        deleteChat: async ({ chatId, msgId }, req) => {
            if (!req.userId) throw new Error("unauthenticated");
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




