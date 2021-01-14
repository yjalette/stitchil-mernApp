const Gig = require("../../models/gig");

module.exports = {
    Query: {
        explore_items: async (_, { filters }, req) => {

            if (Object.values(filters).length < 1) return await Gig.find().sort({ createdAt: -1 }).limit(10);
            else {
                return await Gig.find({
                    $or: [
                        { category: { $in: filters.category } },
                        { style: { $in: filters.style } }
                    ]
                }).limit(10);
            }


        },

    },
    // Mutation: {

    // },
    ExploreItem: {
        __resolveType(obj) {
            console.log(obj)
            if (obj.bids) return 'BuyerItem';
            if (obj.delivery) return 'DesignerItem';
            return null;
        }
    }

}








