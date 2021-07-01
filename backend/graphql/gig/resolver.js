const Gig = require("../../models/gig");
const Item = require("../../models/item");
/**
 * @param {Object} filters 
 * @param {string} name
 * @returns {Object[]}
 */

module.exports = {
    Query: {
        gig: async (_, { itemId }, { userId }) => {
            // const gigs = await Gig.find({ "variants": { $exists: true, $not: { $size: 0 } } }
            return await Gig.findOne({ item: itemId }).populate({ path: "item" })
        },
        explore_gigs: async (_, { filters, page }, { res }) => {
            const query = filters && Object.values(filters).length > 0 ? createFilterQuery(filters) : {}
            const items = await Item.find(query)
                .populate({ path: "creator", select: "username country" })
                .sort({ createdAt: -1 })
                .limit(10)
            return { items, total: items.length }

        },
        view_gigs_item: async (_, { id }, req) => {
            return await Gig.findById(id);
        }
    },
    Mutation: {
        // create_gig_variant: async (_, { variantInput, itemId }, { userId }) => {
        //     if (!userId) throw new Error("unauthenticated");
        //     await Gig.findOneAndUpdate({ item: itemId }, { $push: { variants: variantInput } })
        //     return true
        // },
        // update_gig_variant: async (_, { variantInput, itemId }, { userId }) => {
        //     if (!userId) throw new Error("unauthenticated");
        //     await Gig.updateOne(
        //         { "variants._id": variantInput._id },
        //         { $set: { "variants.$": variantInput } }
        //     )
        //     return true
        // }
    }
}

function createFilterQuery(filters) {
    const query = {}
    if (filters.keywords) query['$text'] = {
        $search: filters.keywords
    }
    else {
        query['$and'] = Object.keys(filters).map(name => {
            const value = filters[name];
            if (name === 'min' || name === 'max') {
                return { 'price': { $lte: value || 1000, $gte: value || 0 } }
            }
            else return value && { [name]: { $in: value } }
        })
    }
    return query
}

// function makeFiltersQuery(filters, names) {
//     return names.reduce((res, name) => {
//         const value = filters[name];
//         if (value && typeof value !== "undefined") {
//             res.push({ $in: value })
//         }
//         else return {}
//     }, [])
// }




