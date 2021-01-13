import gql from 'graphql-tag';

export const PROFILE_INTRO_QUERY = gql`
        query profile_intro($username: String){
            profile_intro(username: $username) {
                username
                fullname
                languages
                coverImage
                profileImage
                country
                role
                portfolio   
        }  
    }
`



export const PROFILE_PORTFOLIO_QUERY = gql`
query profile_portfolio($username: String){
    profile_portfolio(username: $username){
        _id
        imageUrl
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
        imageUrl
        price
        delivery
        category
        style
        fabric
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
