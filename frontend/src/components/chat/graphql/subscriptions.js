import gql from 'graphql-tag';

export const CHAT_SUBSCRIPTION = gql`
subscription chat($chatId: ID){
            chat(chatId: $chatId){
              _id
              messages {
                  _id
                  sender 
                  message 
                  createdAt
              }
          }

        }
    
`


export const CHAT_MESSAGES_SUBSCRIPTION = gql`
subscription chat_messages($chatId: ID){
            chat_messages(chatId: $chatId){
                    _id
                    sender {
                      username
                    }
                    message 
                    createdAt
            }

        }
 `