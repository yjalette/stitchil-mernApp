const User = require("../../models/user");
const Portfolio = require("../../models/portfolio");
const { sendEmail } = require("../../helpers/nodemailer")
const { generateJWT, comparePwd, createPwd } = require("../../helpers/creds");

module.exports = {
    Query: {
        login: async (_, { email, password, googleAuth, confirmed }) => {
            console.log(email, confirmed)
            const user = await User.findOne({ email }).lean();
            if (!user) return { code: 401, message: "User Does Not Exit" };
            const isPwdValid = !googleAuth && await comparePwd(password, user.password);
            if (!googleAuth && !isPwdValid) return { code: 401, message: "Wrong Password" }
            else if (confirmed) await user.updateOne(confirmed);
            // const result = { token: generateJWT(user._id, email), username: user.username, role: user.role, googleAuth }
            // console.log(result)
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
                        html: `<a href=${process.env.APP_ORIGIN}/update/updateuser/${token}>click</a>`
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
            console.log("createuser--->", userInput)
            const { email, username, role } = userInput;
            const isUser = await User.findOne({ email });
            if (isUser) return { "code": 401, message: "User Already Exists" };
            const usernameTaken = await User.findOne({ username });
            if (usernameTaken) return { "code": 401, message: "This username is already taken" };

            const user = new User({
                ...userInput,
                password: !userInput.googleAuth ? await createPwd(userInput.password) : null,
                confirmed: userInput.googleAuth || false,
                createdAt: new Date()
            });

            if (role === "designer") {
                const portfolio = new Portfolio({ creator: user._id, createdAt: new Date() }).save();
                user.portfolio = portfolio._id;
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
                            link: 'http://localhost:3000/confirm/email'
                        }
                    });
                } catch (error) {
                    console.log("err--->", error)
                    return { "code": 401, message: "Please Try Different Email Address" };
                }

                await user.save();
                return { emailSent: true };
            }
        },
        forgotPassword: async (_, { email }, req) => {
            const user = await User.findOne({ email }).lean();
            if (!user) return false;
            try {
                if (user && !req.isUser) {
                    const token = generateJWT(user._id, email)
                    return await sendEmail({
                        subject: "reset password",
                        template: "resetPwd",
                        context: {
                            link: `<a href=http://localhost:3000/update/updateuser/${token}>click</a>`
                        }
                    }
                    );
                }

            } catch (error) {
                throw new Error(error)
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
