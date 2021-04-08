import gql from 'graphql-tag';

export const CHATS_QUERY = gql`
        query chats{
            chats{
                _id
                chatId
                chatImg   
                lastMessage
                member
                updatedAt        
            }
        }
    
`

export const CHAT_MESSAGES_QUERY = gql`
        query chat_messages($chatId: String){
            chat_messages(chatId: $chatId){
                    _id
                    chatId
                    sender {
                        username
                        profileImage
                    }
                    message 
                    createdAt
            }
        }
    
`