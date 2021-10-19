const { sendEmail } = require("../../helpers/nodemailer");
const Order = require("../../models/order");
const Chat = require("../../models/chat");
const Item = require("../../models/item");

module.exports = {
    Query: {
        order: async (_, { orderId }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");

            const order = await Order.findById(orderId)
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
                .populate({
                    path: "seller"
                })
                .populate({
                    path: "buyer"
                })

            return order
        }
    },
    Mutation: {
        createOrder: async (_, { orderInput }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            const {
                itemId,
                packageId,
                fabricId,
                shippingId,
                shippingAddressId } = orderInput;

            const item = await Item
                .findById(itemId, { title: 1, creator: 1 }).populate({
                    path: "creator",
                    select: "email"
                })

            const order = await new Order({
                item: itemId,
                package: packageId,
                fabric: fabricId,
                shipping: shippingId,
                shippingAddress: shippingAddressId,
                status: "pending",
                createdAt: new Date(),
                seller: item.creator,
                buyer: userId
            }).save();

            if (order) {
                await sendEmail({
                    subject: `New order ${item.title}`,
                    template: 'new_order',
                    context: {
                        name: item.creator.email,
                        link: `http://localhost:3000/confirm-order/${order._id}/`
                    }
                })
            }

            return order._id
        },
        confirmOrder: async (_, { orderId }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            const order = await Order.findByIdAndUpdate(orderId,
                {
                    status: "active",
                })
                .populate({ path: "item", select: "-_id title" })
                .populate({ path: "buyer", select: "email" })


            const chat = await new Chat({
                _id: order._id,
                members: [order.buyer._id, userId],
                createAt: new Date()
            })
            chat.save()
            await order.save()
            console.log(order)
            if (order) {
                await sendEmail({
                    subject: `order ${order.item.title} confirmed`,
                    template: 'new_order',
                    context: {
                        name: order.buyer.email,
                        link: `http://localhost:3000/order/${order._id}/`
                    }
                })
                return true
            }


        }
    }
}





