const { gql } = require("apollo-server-express");


module.exports = gql`

type AuthData {   
    role: String
    username: String
    fullname: String
    profileImage: String
    coverImage: String
    country: String
    token: String
    googleAuth: Boolean
}

input ItemInput {
    _id: ID
    title: String
    description: String
    style: [String]
    category: [String]
    price: Int
    fabric: [String]
    imageUrl: String
    delivery: Int
    keywords: [String]
}

type Error {
    code: Int
    type: String
    path: String
    field: String
    message: String
}




`;

