import gql from 'graphql-tag';

export const CHAT_QUERY = gql`
        query chat($chatId: ID){
            chat(chatId: $chatId){
                _id   
                messages {
                  _id
                    sender {
                        username
                    } 
                    createdAt
                }       
            }
        }
 `