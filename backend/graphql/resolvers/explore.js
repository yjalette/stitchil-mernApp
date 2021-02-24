const Gig = require("../../models/gig");
const { populateByUser } = require("../../consts/user");

module.exports = {
    Query: {
        explore_items: async (_, { filters, page }, req) => {
            console.log(filters)
            if (filters && Object.values(filters).length > 0) {
                const items = await Gig.find({
                    $and: [
                        { category: filters.category && filters.category.length > 0 ? { $in: filters.category } : { $exists: true } },
                        { styles: filters.styles && filters.styles.length > 0 ? { $in: filters.styles } : { $exists: true } },
                        { price: { $lt: Number(filters.max) || 1000, $gt: Number(filters.min) || 1 } }
                    ]
                })
                    // .count((err, count) => console.log("count--->", count))
                    .populate(populateByUser)
                    .sort({ createdAt: -1 })
                // .limit(10)
                return { items, total: items.length }
            }
            const items = await Gig.find().populate(populateByUser).sort({ createdAt: -1 }).limit(10);
            return { items }
        }

    }
}








