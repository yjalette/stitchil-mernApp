const { sendEmail } = require("../../helpers/nodemailer");
const Order = require("../../models/order");
const Item = require("../../models/item");

module.exports = {
    Query: {
        dashboard: async (_, { }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");

            const orders = await Order.find({ buyer: userId })
                .populate({
                    path: "item"
                })
                .populate({
                    path: "package"
                })
                .populate({
                    path: "fabric"
                })
                .populate({
                    path: "shipping"
                })

            return {
                orders
            }
        },
    },

}





