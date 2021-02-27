const { gql } = require("apollo-server-express");


module.exports = gql`



type Query { 
    messages(docId: ID): [Message]  
    comments(docId: ID):[Comment] 
    profile_reviews(username: String):[Comment]      
    likes(docId: ID, docName: String): [String]   
}

type Mutation {    
    createComment(message: String, docId: ID): Boolean
    createReview(message: String, recipient: String, rating: Int): Boolean
    contactUs(email: String, subject: String, message: String): Boolean 
    deleteComment(itemId: ID): Boolean  
}




`;


