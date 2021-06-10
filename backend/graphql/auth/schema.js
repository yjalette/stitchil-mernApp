const { gql } = require("apollo-server-express");


module.exports = gql`


union AuthResult = AuthData | Confirmation | Error


type Login {
    role: String
    username: String
    fullname: String
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
    login(email: String!, password: String, remember: Boolean, googleAuth: Boolean, verifiedEmail: Boolean): AuthResult      
}

type Mutation {    
    createUser(userInput: UserInput): AuthResult 
    forgotPassword(email: String): Response  
    logout: Boolean
}

`;

