import gql from 'graphql-tag';

export const CHAT_QUERY = gql`
    query chat($chatId: ID){
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


export const CHAT_ID = gql`
    query chat_id($member: String){
            chat_id(member: $member){
                _id
            }

        }
    
`


export const CHAT_MESSAGES_QUERY = gql`
    query chat_messages($chatId: ID){
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
