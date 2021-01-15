const Gig = require("../../models/gig");
const { populateByUser } = require("../../consts/user");

module.exports = {
    Query: {
        explore_items: async (_, { filters, price }, req) => {

            if (Object.values(filters).length > 0 || Object.values(price).length > 0) {
                const result = await Gig.find({
                    $and: [
                        { category: filters.category && filters.category.length > 0 ? { $in: filters.category } : { $exists: true } },
                        { style: filters.style && filters.style.length > 0 ? { $in: filters.style } : { $exists: true } },
                        { price: { $lt: price.max || 1000, $gt: price.min || 1 } }
                    ]
                })
                    .populate(populateByUser)
                    .sort({ createdAt: -1 })
                    .limit(10)


                return result
            }


            else return await Gig.find().sort({ createdAt: -1 }).limit(10);

        },

    },
    // Mutation: {

    // },
    ExploreItem: {
        __resolveType(obj) {
            if (obj.bids) return 'BuyerItem';
            if (obj.delivery) return 'DesignerItem';
            return null;
        }
    }

}








