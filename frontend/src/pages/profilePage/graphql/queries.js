import gql from 'graphql-tag';

// import gql from 'graphql-tag';

// export const PROFILE_USER_QUERY = gql`
//         query userProfile($username: String){
//             userProfile(username: $username) {
//                 intro {
//                     username
//                     fullname
//                     languages
//                     coverImage
//                     profileImage
//                     country
//                     rating
//                     role
//                     lastSeen
//                     designer {
//                         education
//                         skills
//                         styles
//                         experience
//                     }
//                 }
//                 portfolio {
//                     _id
//                     coverImage
//                     gallery
//                     title
//                     description
//                 }  

//                 gigs {
//                     _id
//                     title
//                     description
//                     coverImage
//                     gallery
//                     price
//                     delivery
//                     category
//                     styles
//                     fabrics
//                     keywords
//                     createdAt
//                 }

//                 reviews {
//                     _id
//                     sender{
//                         profileImage
//                         username
//                     }
//                     message
//                     createdAt
//                 }


//         }  
//     }
// `

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
                    title
                    description
                    coverImage
                    style
                    gallery
                    garment
                    category
                    occasion
                    keywords
                    updatedAt
                }  

                gigs {
                    _id
                    title
                    description
                    style
                    coverImage
                    gallery
                    garment
                    category
                    occasion
                    keywords
                    updatedAt
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

