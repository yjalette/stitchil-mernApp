import gql from 'graphql-tag';

export const CHATS_QUERY = gql`
        query chats{
            chats{
                    _id
                    members {
                        username
                        profileImage
                    }
                    messages {
                        _id
                        message
                        sender {
                            username
                            profileImage
                        }
                        createdAt
                    }
            }
        }
    
`