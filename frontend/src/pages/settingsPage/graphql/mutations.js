import gql from 'graphql-tag';

export const UPDATE_GENERAL_MUTATION = gql`
mutation UpdateGeneral($country: [String], $languages: [String], $fullname: String){
    updateGeneral(country: $country, languages: $languages, fullname: $fullname){
        ... on Result {
            success
           message
        }

        ... on Failure {
            message 
            code 
            type 
        }
    }
    }    
`

export const UPDATE_EMAIL_MUTATION = gql`
        mutation updateEmail($email: String){
            updateEmail(email: $email){
                ... on Result {
                    success
                   message
                }
    
                ... on Failure {
                    message 
                    code 
                    type 
                }
            }
        }
`

export const UPDATE_USERNAME_MUTATION = gql`
        mutation updateUsername($username: String){
            updateUsername(username: $username){
                ... on Result {
                    success
                   message
                }
    
                ... on Failure {
                    message 
                    code 
                    type 
                }
            }
        }
`

export const UPDATE_PASSWORD_MUTATION = gql`
mutation updatePassword($passwordInput: PasswordInput, $token: String){
    updatePassword(passwordInput: $passwordInput, token: $token) {      
        ... on Result {
            success
            message 
        }

        ... on Failure {
            message 
            code 
            type 
        }
         
}     
    }    
`
