const { gql } = require("apollo-server-express");


module.exports = gql`

type Product {
    _id: ID
    item: Item
    creator: AuthData
    createdAt: String
    updatedAt: String
}
type Query { 
    product(itemId: ID): Product           
}


`;


