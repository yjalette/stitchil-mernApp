import gql from 'graphql-tag';

export const SEND_CHAT_MESSAGE_MUTATION = gql`
        mutation send_chat_message($message: String, $recipient: String, $chatId: ID){
            send_chat_message(message: $message, recipient: $recipient, chatId: $chatId){
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
