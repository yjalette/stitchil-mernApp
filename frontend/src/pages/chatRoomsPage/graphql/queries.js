import gql from 'graphql-tag';

export const CHAT_ROOMS_QUERY = gql`
        query chat_rooms{
            chat_rooms{
                _id 
                lastMessage 
                member {
                    username
                    profileImage
                }
                updatedAt        
            }
        }
 `

//  export const CHATS_ROOMS_QUERY = gql`
//         query chat_rooms{
//             chat_rooms{
//                 _id
//                 chatId
//                 chatImg   
//                 lastMessages {
//                   _id
//                     sender {
//                         username
//                     }
//                     message 
//                     createdAt
//                 }
//                 member
//                 updatedAt        
//             }
//         }
//  `

