import gql from 'graphql-tag';

export const MESSAGES_QUERY = gql`
        query messages($username: String){
            messages(username: $username){
                    _id
                    sender {
                        username
                        profileImage
                    }
                    recipient {
                        username
                        profileImage
                    }
                    message 
                    createdAt
            }
        }
    
`


