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



// switch (docType) {
//     case "portfolio": {
//         const portfolio = await Portfolio.findOne({ 'gallery._id': docId });
//         const index = portfolio.gallery.findIndex(slide => slide._id.equals(docId));
//         await portfolio.gallery[index].comments.push({
//             ...commentInput,
//             sender: req.userId,
//             createdAt: new Date()

//         });
//         await portfolio.save();
//         return true
//     }
//     case "reviews": {
//         const recipient = await User.findOne({ username: docId })
//         try {
//             await recipient.reviews.push({
//                 ...commentInput,
//                 sender: req.userId,
//                 createdAt: new Date(),
//             });
//             console.log(recipient.reviews)
//             recipient.save();
//             return true;

//         } catch (error) {
//             throw new Error(error)
//         }
//     }
//     case "gigs": {
//         const gig = await Gig.findById(docId);
//         await gig.comments.push({
//             ...commentInput,
//             sender: req.userId,
//             createdAt: new Date(),

//         });
//         await gig.save();
//         return true
//     }

// }