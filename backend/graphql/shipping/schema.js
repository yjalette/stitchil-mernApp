const { gql } = require("apollo-server-express");


module.exports = gql`

input ShippingInput {
    _id: ID
    itemId: ID
    shippingCarrier: String
    mailClass: String
    shippingPrice: Int
    freeShipping: Boolean
}

type Query { 
    shipping(itemId: ID): Shipping           
}

type Mutation {
    createShipping(shippingInput: ShippingInput, itemId: ID): Shipping 
    updateShipping(shippingInput: ShippingInput): Shipping 
}


`;


