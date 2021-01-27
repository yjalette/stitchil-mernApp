const User = require("../../models/user");
const { comparePwd, createPwd, verifyJWT } = require("../../helpers/creds");
const { uploadToCloud, deleteFile } = require("../../helpers/uploadToCloud");
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
        profile_intro: async (_, { username }, req) => {
            console.log(req)
            return await User.findOne({ username })
                .populate({ path: 'portfolio' })
        },
        userAccount: async (_, args, { userId }) => userId ? await User.findById(userId) : new Error('user is not authorized')
    },
    Mutation: {
        updateUsername: async (_, username, { userId }) => {
            if (await User.exists(username)) return usernameTaken_error;
            return await handleUpdate(userId, username);
        },
        updateEmail: async (_, email, { userId }) => {
            if (await User.exists(email)) return emailTaken_error;
            return await handleUpdate(userId, email);
        },
        // updateGeneral: async (_, args, { userId }) => !await handleUpdate(userId, args) ? server_error : { "success": true },
        updateGeneral: async (_, args, { userId }) => await handleUpdate(userId, args),
        uploadProfileImage: async (_, { file, image_type }, req) => {
            console.log("upload====>", file, image_type)
            if (!req.isUser) throw new Error("unauthenticated user to upload file");
            try {
                const user = await User.findById(req.userId);
                if (user[image_type]) await deleteFile(`${req.userId}/${image_type}`);
                const result = await uploadToCloud({ file, public_id: `${req.userId}/profile/${image_type}` });
                user[image_type] = result.url;
                await user.save();
                return true;
            } catch (error) {
                throw new Error(error);
            }
        },
        updatePassword: async (_, { passwordInput, token }, req) => {
            if (!token && !req.isUser) return unauthorized_error
            const user = await User.findById(token ? verifyJWT(token).userId : req.userId);
            if (!user) return notUser_error
            if (!token && !await comparePwd(passwordInput.password, user.password)) return wrongPwd_error;
            try {
                user.updateOne({ $set: { password: await createPwd(passwordInput.new_password) } })
                return token ? login_redirect : update_success
            } catch (error) {
                return server_error
            }

        }
    },
    LoginResult: {
        __resolveType(obj) {
            console.log(obj)
            if (obj.token) return 'Login';
            if (obj.code) return 'Error';
            return null;
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

