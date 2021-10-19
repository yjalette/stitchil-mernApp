const { gql } = require("apollo-server-express");

module.exports = gql`

type Query {   
    messageList(chatId: ID): [Message]     
}

type Mutation {   
    sendMessage(message: String, attachments: [Upload], chatId: ID): Message     
}

type Subscription {
    newMessage(chatId: ID): Message    
}

`;


