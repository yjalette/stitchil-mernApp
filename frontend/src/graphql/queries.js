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
            styles
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




