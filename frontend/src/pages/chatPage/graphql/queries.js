import gql from 'graphql-tag';

export const CHATS_QUERY = gql`
        query chats{
            chats{
                    _id
                    members {
                        username
                        profileImage
                    }
                    messages {
                        _id
                        message
                        sender {
                            username
                            profileImage
                        }
                        createdAt
                    }
            }
        }
    
`

export const CHAT_MESSAGES_QUERY = gql`
        query chat_messages($chatId: ID){
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