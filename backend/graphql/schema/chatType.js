const { gql } = require("apollo-server-express");


module.exports = gql`



type AuthData {   
    role: String
    username: String
    fullname: String
    profileImage: String
    country: String
    provider: String
}

type Message {
    _id: String
    docId: String
    message: String
    sender: AuthData
    recipient: String
    createdAt: String
}

type Chat {
    _id: ID
    members: [Member]
    messages: [Message]
}

type Member {
    username: String
    profileImage: String
}

input ChatInput {
    message: String
    sender: String
    members: [String]
    messages: [MessageInput]
    profileImage: String
    createdAt: String
}

input MessageInput {
    chatId: String
    message: String
    sender: String
    createdAt: String
}


type Query {        
    chats: [Chat]
}

type Mutation {    
    createChat(message: String, participant: String): Boolean
    createMessage(message: String, docId: String): Boolean 
    deleteMessage(itemId: ID): Boolean 
    deleteChat(chatId: ID, msgId: ID): Boolean 
}




`;


