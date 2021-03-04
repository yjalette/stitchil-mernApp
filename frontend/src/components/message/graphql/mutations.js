import gql from 'graphql-tag';

export const CREATE_MESSAGE_MUTATION = gql`
        mutation CreateMessage($message: String, $recipient: String){
            createMessage(message: $message, recipient: $recipient){
                _id,
                message
                sender{
                    username
                    profileImage
                }
                recipient{
                    username
                    profileImage
                }
                createdAt
            }
        }
`