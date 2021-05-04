const { gql } = require("apollo-server-express");


module.exports = gql`

type Chat {
    _id: ID
   messages: [Message]
}

type Message {
    _id: ID
    docId: String
    message: String
    sender: Member
    createdAt: String
}

type ChatRoom {
    _id: String
    chatId: String
    lastMessage: String
    member: String
    updatedAt: String
    chatImg: String
}

type Member {
    username: String
    profileImage: String
}

type Query {  
    chat_messages(chatId: ID): [Message]      
    chat_rooms: [ChatRoom]
}

type Mutation {  
    send_chat_message(message: String, recipient: String, chatId: ID): Message   
    delete_chat(chatId: ID, msgId: ID): Boolean 
    delete_chat_message(messageId: ID): Boolean  
}

type Subscription {
    chat(chatId: ID): Chat
    chat_messages(chatId: ID): Message    
}


`;


