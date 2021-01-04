const { gql } = require("apollo-server-express");


module.exports = gql`


union AuthResult = AuthData | Confirmation | Error


type Confirmation {
    emailSent: Boolean
    emailConfirmed: Boolean
}

input PasswordInput {
    new_password: String
    prev_password: String
}


input UserInput {
    email: String
    password: String
    username: String
    role: String
    country: String
    fullname: String
    googleAuth: Boolean
    about: String
}


type Query {    
    checkIfExists(email: String): Boolean    
}

type Mutation {    
    createUser(userInput: UserInput): AuthResult 
    forgotPassword(email: String): Boolean  
}

`;

