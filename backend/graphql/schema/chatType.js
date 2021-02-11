const { gql } = require("apollo-server-express");


module.exports = gql`


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
    messages: [String]
}

type Member {
    username: String
    profileImage: String
}

type Query {        
    chats: [Chat]
}

type Mutation {  
    updateChat(message: String,  docId: String): Boolean   
    createMessage(message: String, recipient: String): Boolean 
    deleteMessage(itemId: ID): Boolean 
    deleteChat(chatId: ID, msgId: ID): Boolean 
}




`;


