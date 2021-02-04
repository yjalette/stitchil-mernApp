const { gql } = require("apollo-server-express");


module.exports = gql`

type Query {   
    view_product(id: ID): Product 
}

type Mutation {    
    createProduct(itemInput: ItemInput, files: [Upload]): Boolean
    updateProduct(itemInput: ItemInput, files: [Upload]): Boolean
    deleteProduct(itemId: ID): Boolean 
    likeProduct(docId: ID, username: String): Boolean  
}



`;


