const { gql } = require("apollo-server-express");

module.exports = gql`

type Mutation {   
    sendMessage(message: String, chatId: ID): Message     
}

`;


