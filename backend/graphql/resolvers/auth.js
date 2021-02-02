const User = require("../../models/user");
const { sendEmail } = require("../../helpers/nodemailer")
const { generateJWT, comparePwd, createPwd } = require("../../helpers/creds");
const { server_error, notUser_error, wrongPwd_error, emailTaken_error, usernameTaken_error } = require("../../consts/client_msg");

module.exports = {
    Query: {
        login: async (_, { email, password, googleAuth, verifiedEmail }) => {
            const user = await User.findOne({ email });
            if (!user) return notUser_error;
            if (!googleAuth && !await comparePwd(password, user.password)) return wrongPwd_error;
            if (verifiedEmail) await user.updateOne({ $set: { verifiedEmail: true } });
            await user.updateOne({ lastSeen: new Date() });
            return { token: generateJWT(user._id, email), username: user.username, role: user.role, googleAuth };
        },
        checkIfExists: async ({ email }, req) => {
            const user = await User.findOne({ email }).lean();
            if (!user) return false;
            try {
                if (email && user && !req.isUser) {
                    const token = generateJWT(user._id, email)
                    const mail = {
                        from: "katya.jalette@gmail.com",
                        to: "katya.jalette@gmail.com",
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
            const user = new User({
                ...userInput,
                password: !userInput.googleAuth ? await createPwd(userInput.password) : null,
                verifiedEmail: userInput.googleAuth ? true : false,
                createdAt: new Date()
            });

            if (role === "designer") {
                const designer = new Designer({ creator: user._id }).save();
                user.designer = designer._id;
            }

            if (userInput.googleAuth) {
                await user.save();
                return { token: generateJWT(user._id, email), username, role, googleAuth: true };
            }
            else {
                try {
                    await sendEmail({
                        subject: "Welcome To Stitchil!",
                        template: 'registration',
                        context: {
                            link: 'http://localhost:3000/auth/verify_email'
                        }
                    });
                } catch (error) {
                    return { "code": 401, message: "Please Try Different Email Address" };
                }

                await user.save();
                return { emailSent: true };
            }
        },
        forgotPassword: async (_, { email }, req) => {
            const user = await User.findOne({ email }).lean();
            console.log(notUser_error)
            if (!user) return notUser_error;
            const token = generateJWT(user._id, email)

            try {
                await sendEmail({
                    subject: "reset password",
                    template: "resetPwd",
                    context: {
                        link: `http://localhost:3000/auth/reset/${token}`
                    }
                })
                return { success: true, message: "Please check your email for a link to create a new password" };
            } catch (error) {
                console.log(error)
                return server_error
            }
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
