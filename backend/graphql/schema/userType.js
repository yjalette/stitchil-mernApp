const { gql } = require("apollo-server-express");


module.exports = gql`


type User {   
    role: String
    username: String
    fullname: String
    profileImage: String
    coverImage: String
    country: [String]
    googleAuth: Boolean
}

type Profile {
    username: String
    fullname: String
    country: [String]
    languages: [String]
    profileImage: String
    coverImage: String
    role: String
    portfolio: String
}

type Account {
    email: String
    username: String
    fullname: String
    country: [String]
    languages: [String]
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
    country: [String]
    fullname: String
    googleAuth: Boolean
    location: LocationInput
    about: String
}

input PasswordInput {
    password: String
    new_password: String
}



type Location {
    address: String
    apt: String
    city: String
    state: String
    zipCode: Int
}


type Query {   
    userAccount: Account
    profile_intro(username: String): Profile
   
}

type Mutation {    
    updateGeneral(country: [String], languages: [String], fullname: String): Response
    updateEmail(email: String): Response
    updateUsername(username: String): Response
    updatePassword(passwordInput: PasswordInput, token: String): Response 
}

`;

