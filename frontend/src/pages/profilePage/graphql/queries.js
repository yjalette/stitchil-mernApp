import gql from 'graphql-tag';

export const PROFILE_USER_QUERY = gql`
        query userProfile($username: String){
            userProfile(username: $username) {
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
                portfolio {
                    _id
                    coverImage
                    gallery
                    title
                    description
                    likes
                }  

                gigs {
                    _id
                    title
                    description
                    coverImage
                    gallery
                    price
                    delivery
                    category
                    styles
                    fabrics
                    keywords
                    createdAt
                }

                reviews {
                    _id
                    sender{
                        profileImage
                        username
                    }
                    message
                    createdAt
                }


        }  
    }
`

