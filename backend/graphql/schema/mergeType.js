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
    style: [String]
    category: [String]
    price: Int
    fabric: [String]
    imageUrl: String
    delivery: Int
    keywords: [String]
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

