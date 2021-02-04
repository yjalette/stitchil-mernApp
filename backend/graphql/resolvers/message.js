const User = require("../../models/user");
const Message = require("../../models/message");
const Portfolio = require("../../models/portfolio");
const { transformUsersIds } = require("./merge");
const { sendEmail } = require("../../helpers/nodemailer")

module.exports = {
    Query: {

        likes: async (_, { docId, docName }, req) => {
            try {
                switch (docName) {
                    case "portfolio": {
                        const portfolio = await Portfolio.findOne({ 'gallery._id': docId });
                        const { likes } = portfolio.gallery.id(docId);
                        return transformUsersIds(likes);
                    }
                }
                return true
            } catch (error) {
                throw new Error(error)
            }
        }
    },
    Mutation: {
        createReview: async (_, { message, recipient, rating }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            const newReview = await new Message({
                message,
                rating,
                sender: userId,
                createdAt: new Date()
            }).save();
            await User.findOneAndUpdate({ username: recipient }, { $push: { reviews: newReview._id }, $inc: { rating } })
            return true;
        },
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



