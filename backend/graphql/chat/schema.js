const { gql } = require("apollo-server-express");

module.exports = gql`

type Message {
    _id: ID
    chatId: ID
    message: String
    sender: AuthData
    recipient: AuthData
    createdAt: String
}

type ChatRoom {
    _id: String
    lastMessage: String
    member: AuthData
    updatedAt: String
}

type Chat {
    _id: ID
    members: [AuthData]
    messages: [Message]
    createdAt: String
}

type Member {
    username: String
    profileImage: String
}

type Query {  
    chat(chatId: ID): Chat    
    chat_rooms: [ChatRoom]
}

type Mutation {   
    sendQuickChatMessage(message: String, to_username: String, attachments: [Upload]): Message
    send_chat_message(message: String, to_username: String, from_username: String, chatId: ID): Message   
    sendChatMessage(message: String, to_username: String, from_username: String, chatId: ID): Message
    delete_chat(chatId: ID, msgId: ID): Boolean 
    delete_chat_message(messageId: ID): Boolean  
}

type Subscription {
    chat_new_message(chatId: ID): Message    
}


`;


