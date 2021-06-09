import gql from 'graphql-tag';

export const LOGIN_QUERY = gql`
    query Login($email: String!, $password: String, $remember: Boolean, $verifiedEmail: Boolean, $googleAuth: Boolean) {
        login(email: $email, password: $password, remember: $remember, verifiedEmail: $verifiedEmail, googleAuth: $googleAuth){
            ... on AuthData {
                username
                role
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



