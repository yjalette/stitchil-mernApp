const { gql } = require("apollo-server-express");


module.exports = gql`

type Variation {
    _id: ID
    variationName: String
    options: [Option]
}

type Option {
    _id: ID
    name: String
    note: String
    imageId: ID
    priceIncrease: Int
}

input VariationInput {
    variationName: String
    options: [OptionInput]
}

input OptionInput {
    _id: ID
    name: String
    note: String
    priceIncrease: Int
    imageId: ID
}

type Query { 
    variations(variationId: [ID]): [Variation]           
}

type Mutation {
    createVariation(variationInput: VariationInput, listingId: ID): Variation
    updateVariation(variationInput: VariationInput, variationId: ID): Variation
    deleteVariation(variationId: ID): Boolean
}


`;


