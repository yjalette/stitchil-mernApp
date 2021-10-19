import gql from 'graphql-tag';

export const SEND_USER_MESSAGE_MUTATION = gql`
        mutation sendUserMessage($message: String, $to_username: String, $attachments: [Upload]){
            sendUserMessage(message: $message, to_username: $to_username, attachments: $attachments){
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