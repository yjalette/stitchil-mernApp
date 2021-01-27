const { gql } = require("apollo-server-express");


module.exports = gql`

type Portfolio {
    _id: ID
    public_id: String
    imageUrl: String
    title: String
    description: String
          
}


type Product {
    _id: ID
    imageUrl: String
    coverImage: String
    gallery: [String]
    title: String
    description: String
    likes: [String]
    createdAt: String
}


type Query {   
    profile_portfolio(username: String): [Product]
    view_product(id: ID): Product 
}

type Mutation {    
    createProduct(file: Upload, itemInput: ItemInput): Boolean
    updateProduct(file: Upload, itemId: String, itemInput: ItemInput): Boolean
    deleteProduct(itemId: ID): Boolean 
    likeProduct(docId: ID, username: String): Boolean  
}



`;


