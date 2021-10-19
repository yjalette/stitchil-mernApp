const { gql } = require("apollo-server-express");


module.exports = gql`
type ProfileIntro {
    username: String
    fullname: String
    country: [String]
    languages: [String]
    role: String
    rating: Int
    profileImage: String
    coverImage: String
    lastSeen: String
    designer: DesignerResume
}
type Profile {
    intro: ProfileIntro
    gigs: [Item]
    portfolio: [Item]
    reviews: [Message]
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
    profile(username: String): Profile  
}
type Mutation {    
    sendUserMessage(message: String, to_username: String, attachments: [Upload]): Message
    updateGeneral(country: [String], languages: [String], fullname: String): Response
    updateEmail(email: String): Response
    updateUsername(username: String): Response
    updatePassword(passwordInput: PasswordInput, token: String): Response 
    uploadProfileImage(file: Upload, image_type: String): Boolean
}
`;