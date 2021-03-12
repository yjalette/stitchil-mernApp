const Gig = require("../../models/gig");
const Item = require("../../models/item");

module.exports = {
    Query: {
        explore_gigs: async (_, { filters, page }, req) => {
            if (filters && Object.values(filters).length > 0) {
                const items = await Item.find({
                    $and: [
                        { category: filters.category && filters.category.length > 0 ? { $in: filters.category } : { $exists: true } },
                        { garment: filters.garment && filters.garment.length > 0 ? { $in: filters.garment } : { $exists: true } },
                        // { style: filters.style && filters.style.length > 0 ? { $in: filters.style } : { $exists: true } },
                        // { price: { $lt: Number(filters.max) || 1000, $gt: Number(filters.min) || 1 } }
                    ]
                })
                    .populate({ path: "creator", select: "username country" })
                    .sort({ createdAt: -1 })
                    .limit(10)
                return { items, total: items.length }
            }

            return { items: await Item.find().populate({ path: "creator", select: "username country" }).sort({ createdAt: -1 }).limit(10) }
        },
        search_gigs: async (_, { filters, page }, req) => {
            const items = await Item.find(
                {
                    $text: { $search: filters.keywords },
                    $and: [
                        { category: filters.category && filters.category.length > 0 ? { $in: filters.category } : { $exists: true } },
                        { garment: filters.garment && filters.garment.length > 0 ? { $in: filters.garment } : { $exists: true } },
                        // { style: filters.style && filters.style.length > 0 ? { $in: filters.style } : { $exists: true } },
                        // { price: { $lt: Number(filters.max) || 1000, $gt: Number(filters.min) || 1 } }
                    ]
                },
                { projection: { score: { $meta: "textScore" } } },
            ).sort({ score: { $meta: "textScore" } })
            return { items, total: items.length }
        },
        view_gigs_item: async (_, { id }, req) => {
            return await Gig.findById(id);
        }
    }
}






