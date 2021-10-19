const { gql } = require("apollo-server-express");


module.exports = gql`

input ShippingInput {
    _id: ID
    shippingCarrier: String
    mailClass: String
    shippingPrice: Int
    freeShipping: Boolean
}

type Query { 
    shipping(itemId: ID): Shipping           
}

type Mutation {
    createShipping(shippingInput: ShippingInput, listingId: ID): Shipping 
    updateShipping(shippingInput: ShippingInput, shippingId: ID): Shipping 
    deleteShipping(shippingId: ID): Boolean 
}

`;


