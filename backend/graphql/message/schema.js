const { gql } = require("apollo-server-express");


module.exports = gql`



type Query { 
    messages(member: String): [Message]  
    comments(docId: ID):[Comment]     
    likes(docId: ID, docName: String): [String]   
}

type Mutation {  
    createMessage(message: String, recipient: String, ID: String): Message   
    createComment(message: String, docId: ID): Comment
    createReview(message: String, recipient: String, rating: Int): Message
    contactUs(email: String, subject: String, message: String): Boolean 
    deleteComment(itemId: ID): Boolean  
}

`;


