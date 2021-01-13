const { gql } = require("apollo-server-express");


module.exports = gql`


union AuthResult = AuthData | Confirmation | Error

union LoginResult = Login | Error

type Login {
    role: String
    username: String
    fullname: String
    token: String
    googleAuth: Boolean 

}

type Confirmation {
    emailSent: Boolean
}


input UserInput {
    email: String
    password: String
    username: String
    role: String
    country: [String]
    fullname: String
    languages: [String]
    googleAuth: Boolean
    about: String
}


type Query { 
    login(email: String!, password: String, googleAuth: Boolean, verifiedEmail: Boolean): LoginResult    
    checkIfExists(email: String): Boolean    
}

type Mutation {    
    createUser(userInput: UserInput): AuthResult 
    forgotPassword(email: String): Response  
}

`;

