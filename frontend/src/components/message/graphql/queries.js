import gql from 'graphql-tag';

export const MESSAGES_QUERY = gql`
        query messages($member: String){
            messages(member: $member){
                    _id
                    sender 
                    recipient
                    message 
                    createdAt
            }
        }
    
`


