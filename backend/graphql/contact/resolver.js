const User = require("../../models/user");
const { sendEmail } = require("../../helpers/nodemailer")


module.exports = {
    Mutation: {
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