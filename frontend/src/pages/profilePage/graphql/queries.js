import gql from 'graphql-tag';

export const PROFILE_QUERY = gql`
        query Profile($username: String){
            profile(username: $username) {
             intro {
                username
                fullname
                languages
                coverImage
                profileImage
                country
                rating
                role
                lastSeen
                designer {
                    education
                    skills
                    styles
                    experience
                }
             }
               
                listings {
                    _id
                    listingType
                    details {
                        _id
                        productType
                        title
                        description
                    }
                    active
                    updatedAt
                }

                reviews {
                    _id      
                    message
                    createdAt
                }


        }  
    }
`

