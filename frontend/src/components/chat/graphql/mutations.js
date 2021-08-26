import gql from 'graphql-tag';

export const SEND_CHAT_MESSAGE_MUTATION = gql`
        mutation sendChatMessage($message: String, $from_username: String, $to_username: String, $chatId: ID){
            sendChatMessage(message: $message, to_username: $to_username, from_username: $from_username, chatId: $chatId){
                _id
                chatId
                message
                sender {
                    username
                }
                createdAt
            }
        }
`