const { gql } = require("apollo-server-express");


module.exports = gql`

union Response = Success | Failure

union LoginResult = Login | Error

type User {   
    role: String
    username: String
    fullname: String
    profileImage: String
    coverImage: String
    country: String
    googleAuth: Boolean
}

type Login {
    role: String
    username: String
    fullname: String
    token: String
    googleAuth: Boolean 

}

type Profile {
    username: String
    fullname: String
    country: String
    profileImage: String
    coverImage: String
    role: String
    portfolio: String
}

input LocationInput {
    address: String
    apt: String
    zipCode: Int
    state: String
    city: String
    distance: Int
}

input UserInput {
    email: String
    username: String
    role: String
    country: String
    fullname: String
    googleAuth: Boolean
    location: LocationInput
    about: String
}

input PasswordInput {
    password: String
    newPassword: String
}



type Location {
    address: String
    apt: String
    city: String
    state: String
    zipCode: Int
}

type Failure {
    code: Int
    type: String
    path: String
    field: String
    error: String
    message: String
}


type Success {  
    type: String
    success: Boolean
    message: String
}



type Query {   
    profile_intro(username: String): Profile
    login(email: String!, password: String, googleAuth: Boolean, confirmed: Boolean): LoginResult 
}

type Mutation {    
    updateUser(userInput: UserInput, token: String): Boolean
    updateSecurity(passwordInput: PasswordInput, token: String): Response 
}

`;

