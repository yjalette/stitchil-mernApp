const User = require("../../models/user");
const { sendEmail } = require("../../helpers/nodemailer")
const { authorizeUser } = require("./helpers");
const { generateJWT, comparePwd, createPwd } = require("./../../helpers/creds");
const { notUser_error, wrongPwd_error, emailTaken_error, usernameTaken_error } = require("../../consts/client_msg");

module.exports = {
    Query: {
        login: async (_, { email, password, googleAuth, verifiedEmail }, { res }) => {
            const user = await User.findOne({ email });
            if (!user) return notUser_error;
            if (!googleAuth && !await comparePwd(password, user.password)) return wrongPwd_error;
            if (verifiedEmail) await user.updateOne({ $set: { verifiedEmail } });
            await user.updateOne({ lastSeen: new Date() });
            const token = generateJWT(user._id, email)
            return authorizeUser(res, token, null, { username: user.username, role: user.role, googleAuth });
            // return { token: generateJWT(), username: user.username, role: user.role, googleAuth };
        }
    },
    Mutation: {
        createUser: async (_, { userInput }, { res }) => {
            const { email, username, role } = userInput;
            if (await User.exists({ email })) return emailTaken_error;
            if (await User.exists({ username })) return usernameTaken_error;
            try {
                const user = new User({
                    ...userInput,
                    password: !userInput.googleAuth ? await createPwd(userInput.password) : null,
                    verifiedEmail: userInput.googleAuth ? true : false,
                    createdAt: new Date()
                }).save();

                if (userInput.googleAuth) {
                    const token = generateJWT(user._id, email)
                    return authorizeUser(res, token, null, { username, role, googleAuth });
                }

                const emailSent = await sendEmail({
                    subject: "Welcome To Stitchil!",
                    template: 'registration',
                    context: {
                        name: userInput.fullname,
                        link: 'http://localhost:3000/auth/verify_email'
                    }
                });

                return emailSent;

            } catch (error) {
                throw new ("errr->", error)
            }
        },
        forgotPassword: async (_, { email }) => {
            const user = await User.findOne({ email }).lean();
            if (!user) return notUser_error;
            const emailSent = await sendEmail({
                subject: "reset password",
                template: "resetPwd",
                context: {
                    link: `http://localhost:3000/auth/forgot_password/${generateJWT(user._id, email)}`
                }
            })
            if (emailSent) return { success: true, message: "check your email for a link to create a new password" };
            else return { error: "try a different email address", code: 500 }

        },
        logout: async (_, params, { res }) => {
            res.clearCookie('token');
        }
    }

}
