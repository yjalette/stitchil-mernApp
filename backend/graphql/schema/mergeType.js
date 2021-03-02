const { gql } = require("apollo-server-express");


module.exports = gql`

union Response = Result | Failure

type AuthData {   
    role: String
    username: String
    fullname: String
    profileImage: String
    country: [String]
    rating: Int
    token: String
    googleAuth: Boolean
}

input ItemInput {
    _id: ID
    title: String
    description: String
    styles: [String]
    category: [String]
    price: Int
    fabrics: [String]
    delivery: Int
    coverImage: String
    gallery: [String]
    keywords: [String]
}

type Gig {
    _id: ID
    title: String
    description: String
    category: [String]
    styles: [String]
    price: Int
    fabrics: [String]
    coverImage: String
    gallery: [String]
    delivery: Int
    keywords: [String]
    creator: AuthData
    createdAt: String
    updatedAt: String
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

type Comment{
    _id: ID
    docId: String
    subject: String
    message: String
    sender: AuthData
    rating: Int
    createdAt: String
}


type Message {
    _id: String
    docId: String
    message: String
    sender: AuthData
    recipient: String
    createdAt: String
}

type Failure {
    code: Int
    type: String
    path: String
    field: String
    error: String
    message: String
}


type Result {  
    type: String
    success: Boolean
    message: String
}

type Error {
    code: Int
    type: String
    path: String
    field: String
    message: String
}



`;

