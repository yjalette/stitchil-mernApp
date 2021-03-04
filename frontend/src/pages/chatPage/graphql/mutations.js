import gql from 'graphql-tag';


export const UPDATE_CHAT_MUTATION = gql`
        mutation UpdateChat($message: String, $docId: String){
            updateChat(message: $message, docId: $docId){
                _id
                sender {
                    username
                    profileImage
                }
                message 
                createdAt
            }
        }
`

