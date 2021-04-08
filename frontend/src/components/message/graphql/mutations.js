import gql from 'graphql-tag';

export const CREATE_MESSAGE_MUTATION = gql`
        mutation CreateMessage($message: String, $recipient: String, $chatId: ID){
            createMessage(message: $message, recipient: $recipient, chatId: $chatId){
                _id,
                message
                sender
                recipient
                createdAt
            }
        }
`