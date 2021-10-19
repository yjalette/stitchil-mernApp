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
                portfolio {
                    _id
                    group
                    title
                    description
                    coverImage
                    gallery
                    garment
                    category
                    occasion
                    updatedAt
                    active
                }  

                gigs {
                    _id
                    title
                    group
                    description
                    coverImage
                    gallery
                    garment
                    category
                    occasion
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

