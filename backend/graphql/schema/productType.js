const { gql } = require("apollo-server-express");


module.exports = gql`

type Portfolio {
    _id: ID
    public_id: String
    imageUrl: String
    title: String
    description: String
          
}



type Query {   
    profile_portfolio(username: String): [Product]
    view_product(id: ID): Product 
}

type Mutation {    
    createProduct(itemInput: ItemInput, files: [Upload]): Boolean
    updateProduct(itemInput: ItemInput, files: [Upload]): Boolean
    deleteProduct(itemId: ID): Boolean 
    likeProduct(docId: ID, username: String): Boolean  
}



`;


