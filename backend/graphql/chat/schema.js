const { gql } = require("apollo-server-express");


module.exports = gql`

type Chat {
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
    chats: [Chat]
}

type Mutation {  
    updateChat(message: String,  docId: String): Message   
    deleteMessage(itemId: ID): Boolean 
    deleteChat(chatId: ID, msgId: ID): Boolean 
}

`;


