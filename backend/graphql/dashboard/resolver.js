const { sendEmail } = require("../../helpers/nodemailer");
const Order = require("../../models/order");
const Item = require("../../models/item");
const Listing = require("../../models/listing");
const Gig = require("../../models/gig");

module.exports = {
    Query: {
        dashboard: async (_, { }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");

            const gigs = await Gig.find({})
                .populate({
                    path: "item",
                    match: {
                        creator: userId
                    }
                })

            const listings = await Listing.find({ creator: userId })
                .populate({
                    path: "details",
                    select: "_id title"
                })
            console.log(listings)
            const orders = await Order.find({
                $or: [
                    { seller: userId },
                    { buyer: userId }
                ]
            })
                .populate({
                    path: "item"
                })
            return {
                orders,
                gigs,
                listings
            }
        },
    },

}





