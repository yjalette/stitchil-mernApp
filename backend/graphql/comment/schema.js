const { gql } = require("apollo-server-express");

module.exports = gql`


type Query { 
    comments(docId: ID):[Comment]     
    likes(docId: ID, docName: String): [String]   
}

type Mutation {  
    createComment(message: String, docId: ID): Comment
    createReview(message: String, recipient: String, rating: Int): Message
    contactUs(email: String, subject: String, message: String): Boolean 
    deleteComment(itemId: ID): Boolean  
}


`;


