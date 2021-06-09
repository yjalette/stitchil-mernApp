const { gql } = require("apollo-server-express");

module.exports = gql`

type Chat {
    _id: ID
   messages: [Message]
}

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
    chat_messages(chatId: ID, member: String): [Message]      
    chat_rooms: [ChatRoom]
}

type Mutation { 
    create_chat(member: String, message: String): ID   
    send_chat_message(message: String, recipient: String, chatId: ID): Message   
    delete_chat(chatId: ID, msgId: ID): Boolean 
    delete_chat_message(messageId: ID): Boolean  
}

type Subscription {
    chat(chatId: ID): Chat
    chat_messages(chatId: ID): Message 
    chat_new_message(username: String, chatId: ID): Message    
}


`;


