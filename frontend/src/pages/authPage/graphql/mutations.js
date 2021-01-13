import gql from 'graphql-tag';

export const FORGOT_PASSWORD_MUTATION = gql`
        mutation forgotPassword($email: String){
            forgotPassword(email: $email){      
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

export const SIGNUP_MUTATION = gql`
    mutation CreateUser($userInput: UserInput){
        createUser(userInput: $userInput) 
        {
            ... on Confirmation {
                emailSent
            }
            ... on AuthData {
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