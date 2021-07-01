const Product = require("../../models/product");
const Item = require("../../models/item");
/**
 * @param {Object} filters 
 * @param {string} name
 * @returns {Object[]}
 */

module.exports = {
    Query: {
        product: async (_, { itemId }, { userId }) => {
            return await Product.findOne({ item: itemId }).populate({ path: "item" })
        },

    }
}






