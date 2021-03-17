const User = require("../../models/user");
const { sendEmail } = require("../../helpers/nodemailer")
const { generateJWT, comparePwd, createPwd } = require("../../helpers/creds");
const { server_error, notUser_error, wrongPwd_error, emailTaken_error, usernameTaken_error } = require("../../consts/client_msg");


module.exports = {
    Query: {
        login: async (_, { email, password, googleAuth, verifiedEmail }, { res }) => {
            const user = await User.findOne({ email });
            if (!user) return notUser_error;
            if (!googleAuth && !await comparePwd(password, user.password)) return wrongPwd_error;
            if (verifiedEmail) await user.updateOne({ $set: { verifiedEmail } });
            await user.updateOne({ lastSeen: new Date() });
            const token = generateJWT(user._id, email)
            res.cookie("token", token, {
                httpOnly: true,
                // maxAge: 1000 * 60 * 60 * 24
            })
            return { token, username: user.username, role: user.role, googleAuth };
        },
        checkIfExists: async ({ email }, req) => {
            const user = await User.findOne({ email }).lean();
            if (!user) return false;
            try {
                if (email && user && !req.isUser) {
                    const token = generateJWT(user._id, email)
                    const mail = {
                        subject: "reset password",
                        html: `${process.env.APP_ORIGIN}/update/updateuser/${token}`
                    }

                    return await sendEmail(mail);
                }

            } catch (error) {
                throw new Error(error)
            }
        },

    },
    Mutation: {
        createUser: async (_, { userInput }) => {
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

                if (userInput.googleAuth) return { token: generateJWT(user._id, email), username, role, googleAuth: true };
                else {
                    try {
                        await sendEmail({
                            subject: "Welcome To Stitchil!",
                            template: 'registration',
                            context: {
                                name: userInput.fullname,
                                link: 'http://localhost:3000/auth/verify_email'
                            }
                        });
                    } catch (error) {
                        return { "code": 401, message: "Please Try Different Email Address" };
                    }
                    return { emailSent: true };
                }

            } catch (error) {
                throw new ("errr->", error)
            }
        },
        forgotPassword: async (_, { email }) => {
            console.log(email)
            const user = await User.findOne({ email }).lean();
            if (!user) return notUser_error;
            try {
                await sendEmail({
                    subject: "reset password",
                    template: "resetPwd",
                    context: {
                        link: `http://localhost:3000/auth/forgot_password/${generateJWT(user._id, email)}`
                    }
                })
            } catch (error) {
                console.log(error)
                return server_error
            }
            return { success: true, message: "check your email for a link to create a new password" };
        }
    },
    AuthResult: {
        __resolveType(obj) {
            console.log(obj)
            if (obj.token) return 'AuthData';
            if (obj.emailSent) return 'Confirmation';
            if (obj.code) return 'Error';
            return null;
        }
    }

}
