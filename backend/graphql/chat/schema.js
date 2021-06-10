const { gql } = require("apollo-server-express");

module.exports = gql`

type Message {
    _id: ID
    chatId: String
    message: String
    sender: Member
    recipient: Member
    createdAt: String
}

type ChatRoom {
    _id: String
    chatId: String
    lastMessages: [Message]
    member: String
    updatedAt: String
    chatImg: String
}

type Member {
    username: String
    profileImage: String
}

type Query {      
    chat_rooms: [ChatRoom]
}

type Mutation {   
    send_chat_message(message: String, to_username: String, from_username: String, chatId: ID): Message   
    delete_chat(chatId: ID, msgId: ID): Boolean 
    delete_chat_message(messageId: ID): Boolean  
}

type Subscription {
    chat_new_message(chatId: ID): Message    
}


`;


