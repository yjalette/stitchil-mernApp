import gql from 'graphql-tag';

export const MESSAGE_LIST_QUERY = gql`
        query messageList($chatId: ID){
            messageList(chatId: $chatId){            
                  _id
                  message
                    sender {
                        username
                    } 
                    createdAt
                attachments
                }       
            
        }
 `