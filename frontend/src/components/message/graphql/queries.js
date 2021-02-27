import gql from 'graphql-tag';

export const MESSAGES_QUERY = gql`
        query messages($docId: ID){
            messages(docId: $docId){
                    _id
                    sender {
                        username
                        profileImage
                    }
                    message 
                    createdAt
            }
        }
    
`


