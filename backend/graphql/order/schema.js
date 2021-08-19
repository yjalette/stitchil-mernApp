const { gql } = require("apollo-server-express");


module.exports = gql`

input OrderInput {
    _id: ID
    itemId: ID
    packageId: ID
    fabricId: ID
    shippingId: ID
    shippingAddressId: ID
    billingAddressId: ID
}

type Query {   
    order(orderId: ID): Order  
}

type Mutation {    
    createOrder(orderInput: OrderInput): ID
    confirmOrder(orderId: ID): Boolean
}

`;

