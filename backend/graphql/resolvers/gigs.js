const Gig = require("../../models/gig");
const Item = require("../../models/item");
/**
 * @param {Object} filters 
 * @param {string} name
 * @returns {Object[]}
 */


// function makeFiltersQuery(filters, names) {
//     return names.reduce((res, name) => {
//         const value = filters[name];
//         if (value && typeof value !== "undefined") {
//             res.push({ $in: value })
//         }
//         else return {}
//     }, [])
// }

module.exports = {
    Query: {

        explore_gigs: async (_, { filters, page }, { res }) => {
            if (!filters || Object.values(filters).length < 1) {
                const items = await Item.find()
                    .populate({ path: "creator", select: "username country" })
                    .sort({ createdAt: -1 })
                    .limit(10)
                return { items }
            }
            else {
                const items = await Item.find(createFilterQuery(filters))
                    .populate({ path: "creator", select: "username country" })
                    .sort({ createdAt: -1 })
                    .limit(10)
                return { items, total: items.length }
            }

        },
        view_gigs_item: async (_, { id }, req) => {
            return await Gig.findById(id);
        }
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





