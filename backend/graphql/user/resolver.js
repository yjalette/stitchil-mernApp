const User = require("../../models/user");
const Message = require("../../models/message");
const Chat = require("../../models/chat");
const Listing = require("../../models/listing");
const { comparePwd, createPwd, verifyJWT } = require("../../helpers/creds");
const { uploadToCloud, deleteSingleFile } = require("../../helpers/uploadToCloud");
const { unauthorized_error,
    server_error,
    notUser_error,
    wrongPwd_error,
    emailTaken_error,
    usernameTaken_error,
    update_success,
    login_redirect } = require("../../consts/client_msg");

module.exports = {
    Query: {
        profile: async (_, { username }, req) => {
            const user = await User.findOne({ username })
                .populate({ path: 'designer' })
                .populate({
                    path: "reviews",
                    populate: "sender",
                    options: {
                        sort: {
                            createdAt: -1
                        }
                    }
                })
            return {
                intro: user,
                listings: await Listing
                    .find({ creator: user._id })
                    .populate({ path: "details" })
            }
        },
        userAccount: async (_, args, { userId }) => userId ? await User.findById(userId) : new Error('unauthenticated')
    },
    Mutation: {
        sendUserMessage: async (_, { message, to_username, attachments }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            const user2 = await User.findOne({ username: to_username });
            if (!user2) throw new Error("user doesn't exist");
            const newMessage = await new Message({
                message,
                sender: userId,
                createdAt: new Date()
            })
            const chat = await Chat.findOne({ members: { $all: [userId, user2._id] } })
            if (chat) newMessage.chatId = chat._id

            if (!chat) {
                const newChat = await new Chat({
                    members: [userId, user2._id],
                    createdAt: new Date()
                }).save()
                newMessage.chatId = newChat._id
            }

            await newMessage.save()
            try {
                const result = {
                    ...newMessage._doc
                }
                // pubsub.publish('CHAT_NEW_MESSAGE', { chat_new_message: result });
                return result
            } catch (error) {
                throw Error(error)
            }

        },
        updateUsername: async (_, username, { userId }) => {
            if (await User.exists(username)) return usernameTaken_error;
            return await handleUpdate(userId, username);
        },
        updateEmail: async (_, email, { userId }) => {
            if (await User.exists(email)) return emailTaken_error;
            return await handleUpdate(userId, email);
        },
        updateGeneral: async (_, args, { userId }) => await handleUpdate(userId, args),
        uploadProfileImage: async (_, { file, image_type }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            try {
                const user = await User.findById(userId);
                const public_id = `${userId}/${image_type}`
                if (user[image_type]) await deleteSingleFile({ public_id });
                const result = await uploadToCloud({ file, public_id });
                user[image_type] = result.url;
                await user.save();
                return true;
            } catch (error) {
                throw new Error(error);
            }
        },
        updatePassword: async (_, { passwordInput, token }, { userId }) => {
            if (!token && !userId) return unauthorized_error
            const user = await User.findById(token ? verifyJWT(token).userId : userId);
            if (!user) return notUser_error
            if (!token && !await comparePwd(passwordInput.password, user.password)) return wrongPwd_error;
            try {
                user.updateOne({ $set: { password: await createPwd(passwordInput.new_password) } })
                return token ? login_redirect : update_success
            } catch (error) {
                return server_error
            }

        }
    }

}

async function handleUpdate(userId, param) {
    if (!userId) return unauthorized_error
    try {
        await User.findByIdAndUpdate(userId, param);
        return update_success
    } catch (error) {
        return server_error
    }

}

