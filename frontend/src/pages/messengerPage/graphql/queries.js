import gql from 'graphql-tag';

export const MESSENGER_QUERY = gql`
        query chat_rooms{
            chat_rooms{
                _id
                chatId
                chatImg   
                lastMessages {
                  _id
                    sender {
                        username
                    }
                    message 
                    createdAt
                }
                member
                updatedAt        
            }
        }
 `

