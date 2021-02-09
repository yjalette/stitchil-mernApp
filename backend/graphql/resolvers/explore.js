const Gig = require("../../models/gig");
const { populateByUser } = require("../../consts/user");

module.exports = {
    Query: {
        explore_items: async (_, { filters, price, page }, req) => {
            if (Object.values(filters).length > 0 || Object.values(price).length > 0) {
                const items = await Gig.find({
                    $and: [
                        { category: filters.category && filters.category.length > 0 ? { $in: filters.category } : { $exists: true } },
                        { styles: filters.styles && filters.styles.length > 0 ? { $in: filters.styles } : { $exists: true } },
                        { price: { $lt: price.max || 1000, $gt: price.min || 1 } }
                    ]
                })
                    // .count((err, count) => console.log("count--->", count))
                    .populate(populateByUser)
                    .sort({ createdAt: -1 })
                // .limit(10)
                return items.slice(page, page * 1 + 1)
            }
            const items = await Gig.find().sort({ createdAt: -1 }).limit(10);
            console.log(items)
            return items
        }

    }
}








