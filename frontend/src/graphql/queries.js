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

export const LOGIN_QUERY = gql`
    query Login($email: String!, $password: String, $confirmed: Boolean, $googleAuth: Boolean) {
        login(email: $email, password: $password, confirmed: $confirmed, googleAuth: $googleAuth){
            ... on Login {
                token
                role
                username
                googleAuth
               
            }

            ... on Error {
                message 
                code 
                type 
            }
             
    }
}
    `;



export const ACCOUNT_QUERY = gql`
    query userAccount{
        userAccount {
            email
            username
            fullname
            languages
            country  
    }  
}
`

export const DESIGNER_RESUME_QUERY = gql`
    query designerResume($portfolioId: String){
        designerResume(portfolioId: $portfolioId){
            education
            skills
            style
            experience
            about
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

export const FILES_QUERY = gql`
query files($docId: String){
    files(docId: $docId){
    _id
    docId
    imageUrl
    caption {
        title
        description
     }
}
}
       
`

export const USER_QUERY = gql`
        query user($username: String){
            user(username: $username) {
                username
                fullname
                email 
                googleAuth
                coverImage
                profileImage
                country
                role
                portfolio
                location {
                    address
                    apt
                    city
                    state
                    zipCode
                }  
            }  
    }
`


export const CHECK_IF_EXISTS_QUERY = gql`
        query checkIfExists($email: String){
            checkIfExists(email: $email)
        }
`


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

export const MESSAGES_QUERY = gql`
        query messages{
            messages{
                    _id
                    recipient {
                        username
                        profileImage
                    }
                    sender {
                        username
                        profileImage
                    }
                    message
                    createdAt
                    
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

export const FILTER_GIGS_QUERY = gql`
    query filter_gigs($keyWords: String, $categories: [String], $garmentType: [String], $minPrice: Int, $maxPrice: Int, $sortBy: String,  $limit: Int){
        filter_gigs(keyWords: $keyWords, categories: $categories,garmentType: $garmentType, minPrice: $minPrice, maxPrice: $maxPrice, sortBy: $sortBy, limit: $limit) {
            _id
            title
            description
            imageUrl
            price
            delivery
            categories
           garmentType
            fabrics
            createdAt
            creator {
                username
                profileImage
               country
               rating
            }
        }
    }
`


export const FILTER_TALENTS_QUERY = gql`
    query filter_talents($specialties: [String], $categories: [String], $experience: [String], $sortBy: String, $limit: Int){
        filter_talents(specialties: $specialties, categories: $categories, experience: $experience, sortBy: $sortBy, limit: $limit) {
                designerInfo{
                    education
                    skills
                    specialties
                    experience
                    about
                }
                gallery {
                    _id
                    public_id
                    imageUrl
                    title
                    description
                }
        
                creator {
                    username
                    profileImage
                    country
                }
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


export const COMMENTS_QUERY = gql`
query comments($docId: ID){
    comments(docId: $docId) {
        _id
        docId
        sender{
            profileImage
            username
        }
        message
        createdAt
    }
}
`

