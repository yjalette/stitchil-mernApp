const User = require("../../models/user");
const { comparePwd, createPwd, verifyJWT } = require("../../helpers/creds");
const { uploadToCloud, deleteFile } = require("../../helpers/uploadToCloud");

module.exports = {
    Query: {
        profile_intro: async (_, { username }, req) => {
           return await User.findOne({ username })
        },
        userAccount: async (_, args, req) => {
            if (!req.isUser) throw new Error('user is not authorized');
            return await User.findById(req.userId);
        }
    },
    Mutation: {
        updateUsername: async (_, username, {userId}) => {
           if (await User.exists(username)) return {"code": 401, "message": "this username is already taken"};
           return !await handleUpdate( userId, username) ? {"code": 501, "message": "please try again"} : {"success": true};
        },
        updateEmail: async (_, email, {userId}) => {
           if (await User.exists(email)) return {"code": 401, "message": "this email is already taken"};
           return !await handleUpdate( userId, email) ? {"code": 501, "message": "please try again"} : {"success": true};
        
        },
        updateGeneral: async (_, args, {userId}) => !await handleUpdate( userId, args) ? {"code": 501, "message": "please try again"} : {"success": true},
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
            console.log("1", passwordInput)
            if (!token && !req.isUser) return { code: 401, error: "user is not authorized" }
            if (token && !await User.exists(verifyJWT(token).userId)) return { code: 401, "message": "user does not exist" }
            try {
                const user = await User.findById(req.userId);
                if (user.password && !await comparePwd(passwordInput.password, user.password)) return { "code": 400, "message": "wrong password" }
                user.password = await createPwd(passwordInput.new_password);
                await user.save();
                return { "success": true, "message": "Your New Password Was Saved" }
            } catch (error) {
                return { code: 500, "message": "Server Error. Please Try Again" }
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

async function handleUpdate(userId, param){
    if (!userId) throw new Error('user is not authorized');
    await User.findByIdAndUpdate(userId, param, (err, data) => {
        if (err) throw new Error(err);
    })
    return true;
}

