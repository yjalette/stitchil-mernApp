import gql from 'graphql-tag';

export const SEND_CHAT_MESSAGE_MUTATION = gql`
        mutation send_chat_message($message: String, $recipient: String, $chatId: ID){
            send_chat_message(message: $message, recipient: $recipient, chatId: $chatId){
                _id
                message
                sender {
                    username
                }
                createdAt
            }
        }
`

export const CREATE_CHAT_MUTATION = gql`
        mutation create_chat($message: String, $recipient: String){
            create_chat(message: $message, recipient: $recipient){
                _id
                message
                sender
                recipient
                createdAt
            }
        }
`

export const DELETE_CHAT_MESSAGE_MUTATION = gql`
        mutation delete_chat_message($messageId: ID){
            delete_chat_message(messageId: $messageId)
        }
`