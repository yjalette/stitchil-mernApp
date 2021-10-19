import gql from 'graphql-tag';

export const SEND_CHAT_MESSAGE_MUTATION = gql`
        mutation send_chat_message($message: String, $from_username: String, $to_username: String, $chatId: ID){
            send_chat_message(message: $message, to_username: $to_username, from_username: $from_username, chatId: $chatId){
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

export const SEND_MESSAGE_MUTATION = gql`
        mutation sendMessage($message: String, $attachments: [Upload],  $chatId: ID){
            sendMessage(message: $message, attachments: $attachments, chatId: $chatId){
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
