const Product = require("../../models/product");

module.exports = {
    Query: {
        product: async (_, { productId }, req) => {
            const product = await Product.findById(productId)
            return product
        }
    },
    Mutation: {
        createProduct: async (_, { productInput }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            try {
                const newProduct = await new Product({
                    ...productInput
                }).save()
                return newProduct._id
            } catch (error) {
                throw new Error(`create product error +====> ${error}`)
            }
        },
        updateProduct: async (_, { productInput }, { userId }) => {
            if (!userId) throw new Error("unauthenticated");
            try {
                await Product.findByIdAndUpdate(productInput._id, {
                    $set: {
                        ...productInput,
                        updatedAt: new Date()
                    }
                })
                return true
            } catch (error) {
                console.log(error)
            }
        }

    }

}

