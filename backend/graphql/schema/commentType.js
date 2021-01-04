const { gql } = require("apollo-server-express");


module.exports = gql`



type Message {
    _id: String
    message: String
    sender: AuthData
    recipient: String
    createdAt: String
}

input MessageInput {
    docId: String
    message: String
    sender: String
    subject: String
    createdAt: String
}

type Comment{
    _id: ID
    docId: String
    subject: String
    message: String
    sender: AuthData
    rating: Int
    createdAt: String
}

input ReviewInput {
    subject: String
    message: String
    rating: Int
}

type Query {  
    comments(docId: ID):[Comment] 
    profile_reviews(username: String):[Comment]      
    likes(docId: ID, docName: String): [String]   
}

type Mutation {    
    createComment(message: String, docId: ID): Boolean
    createReview(reviewInput: ReviewInput, recipient: String): Boolean 
    contactUs(email: String, subject: String, message: String): Boolean 
    deleteComment(itemId: ID): Boolean  
}




`;


