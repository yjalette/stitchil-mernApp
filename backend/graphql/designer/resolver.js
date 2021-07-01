const Designer = require("../../models/designer");
const User = require("../../models/user");
const Product = require("../../models/product");
const { populateByUser } = require("../../consts/user");

module.exports = {
    // Query: {
    //     view_portfolio_item: async (_, { id }, req) => {
    //         return await Product.findById(id).populate(populateByUser);
    //     }
    // },
    Mutation: {
        updateDesigner: async (_, { designerInput }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            try {
                if (!await Designer.exists({ creator: userId })) {
                    const newDesigner = await new Designer({ ...designerInput, creator: userId }).save();
                    await User.findByIdAndUpdate(userId, { designer: newDesigner._id })
                }
                else await Designer.findOneAndUpdate({ creator: userId }, { $set: { ...designerInput, updatedAt: new Date() } });
            } catch (error) {
                throw new Error(error)
            }
            return true
        }
    }

}
