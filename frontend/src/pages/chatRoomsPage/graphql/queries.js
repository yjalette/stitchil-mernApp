import gql from 'graphql-tag';

export const CHATS_ROOMS_QUERY = gql`
        query chat_rooms{
            chat_rooms{
                _id
                chatId
                chatImg   
                lastMessage
                member
                updatedAt        
            }
        }
 `