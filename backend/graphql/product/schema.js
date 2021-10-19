const { gql } = require("apollo-server-express");


module.exports = gql`


input ProductInput {
    _id: ID
    implementation: String
    title: String
    description: String
    category: [String]
    garment: String
    occasion: [String]
}

type Query {   
    product(productId: ID): Product  
}

type Mutation {    
    createProduct(productInput: ProductInput): ID 
    updateProduct(productInput: ProductInput): Boolean 
}

`;

