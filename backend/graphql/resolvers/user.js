const User = require("../../models/user");
const { comparePwd, createPwd, verifyJWT } = require("../../helpers/creds");
const { uploadToCloud, deleteFile } = require("../../helpers/uploadToCloud");

module.exports = {
    Query: {
        profile_intro: async (_, { username }, req) => await User.findOne({ username }),
        userAccount: async (_, args, req) => {
            if (!req.isUser) throw new Error('user is not authorized');
            return await User.findById(req.userId);
        }
    },
    Mutation: {
        updateUsername: async (_, username, {userId}) => {
           const isTaken = await User.findOne(username);
           if (isTaken) return {"code": 401, "message": "username is taken"}
           else return handleUpdate( userId, username)
           
        
        },
        updateEmail: async (_, email, {userId}) => {
            handleUpdate( userId, email)
        },
        updateGeneral: async (_, args, {userId}) => {
           handleUpdate(userId, args)
        },
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
        updateSecurity: async (_, { passwordInput, token }, req) => {
            let user;
            const { newPassword } = passwordInput;
            if (token) {
                let decodedToken;
                decodedToken = verifyJWT(token);
                user = await User.findById(decodedToken.userId);
                if (!user) return { code: 401, error: "user does not exist" }
            }
            else if (passwordInput) {
                user = await User.findById(req.userId);
                if (!req.isUser) return { code: 401, error: "user is not authorized" }
                if (user.password) {
                    const isEqual = await comparePwd(passwordInput.password, user.password);
                    if (!isEqual) return { code: 400, error: "wrong password" }
                }
            }
            try {
                user.password = await createPwd(newPassword);
                await user.save();
                return { success: true, message: "Your New Password Was Saved" }
            } catch (error) {
                return { code: 500, error: "Server Error. Please Try Again" }
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
        console.log(param, data)
        if (err) return false;
        else return {success: true}
    })
}

