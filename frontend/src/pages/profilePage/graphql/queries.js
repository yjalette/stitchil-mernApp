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
                role
                lastSeen
                designer {
                    education
                    skills
                    styles
                    experience
                    about
                }
                portfolio {
                    _id
                    coverImage
                    title
                    description
                    likes
                }  

                gigs {
                    _id
                    title
                    description
                    coverImage
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



export const PROFILE_PORTFOLIO_QUERY = gql`
query profile_portfolio($username: String){
    profile_portfolio(username: $username){
        _id
        imageUrl
        coverImage
        title
        description
        likes
    }
   
}
       
`

export const PROFILE_GIGS_QUERY = gql`
query profile_gigs($username: String){
    profile_gigs(username: $username) {
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
}

`

export const PROFILE_REVIEWS_QUERY = gql`
query profile_reviews($username: String){
    profile_reviews(username: $username) {
        _id
        docId
        sender{
            profileImage
            username
        }
        message
        subject
        createdAt
    }
}
`
