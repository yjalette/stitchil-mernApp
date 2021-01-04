import gql from 'graphql-tag';


export const UPDATE_USER_MUTATION = gql`
mutation UpdateUser($userInput: UserInput, $token: String){
    updateUser(userInput: $userInput, token: $token) 
    }    
`

export const UPDATE_SECURITY_MUTATION = gql`
mutation UpdateSecurity($passwordInput: PasswordInput, $token: String){
    updateSecurity(passwordInput: $passwordInput, token: $token) {      
        ... on Success {
            success
            message 
        }

        ... on Failure {
            error 
            code 
            type 
        }
         
}     
    }    
`

export const FORGOT_PASSWORD_MUTATION = gql`
        mutation forgotPassword($email: String){
            forgotPassword(email: $email)
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


export const UPDATE_DESIGNER_MUTATION = gql`
        mutation UpdateDesigner($designerInput: DesignerInput){
            updateDesigner(designerInput: $designerInput)
            
        }
`
export const CREATE_PORTFOLIO_ITEM_MUTATION = gql`
        mutation CreatePortfolioItem($itemInput: ItemInput, $file: Upload ) {
            createPortfolioItem(itemInput: $itemInput, file: $file)
        }
      `;

export const UPDATE_PORTFOLIO_ITEM_MUTATION = gql`
      mutation UpdatePortfolioItem($itemInput: ItemInput, $file: Upload, $itemId: String ) {
        updatePortfolioItem(itemInput: $itemInput, file: $file, itemId: $itemId )
      }
    `;


export const DELETE_PORTFOLIO_ITEM_MUTATION = gql`
          mutation DeletePortfolioItem($itemId: ID){
            deletePortfolioItem(itemId: $itemId)
          }
      `;

export const UPLOAD_PROFILE_IMAGE_MUTATION = gql`
  mutation UploadProfileImage($file: Upload, $image_type: String ) {
    uploadProfileImage(file: $file, image_type: $image_type)
  }
`;

export const DELETE_PROFILE_IMAGE_MUTATION = gql`
    mutation DeleteProfileImage($image_type: String){
        deleteProfileImage(image_type: $image_type)
    }
`;

export const CREATE_CHAT_MUTATION = gql`
        mutation CreateChat($message: String, $participant: String){
            createChat(message: $message, participant: $participant)
        }
`

export const CREATE_MESSAGE_MUTATION = gql`
        mutation CreateMessage($message: String,  $docId: String){
            createMessage(message: $message, docId: $docId )
        }
`

export const CREATE_COMMENT_MUTATION = gql`
        mutation CreateComment($message: String,  $docId: ID){
            createComment(message: $message, docId: $docId)
        }
`

export const CREATE_REVIEW_MUTATION = gql`
        mutation CreateReview($reviewInput: ReviewInput, $recipient: String ){
            createReview(reviewInput: $reviewInput, recipient: $recipient)
        }
`

export const CONTACT_US_MUTATION = gql`
    mutation ContactUs($email: String, $message: String, $subject: String){
        contactUs(email: $email, message: $message, subject: $subject)
    }
`;


export const DELETE_CHAT_MUTATION = gql`
mutation DeleteChat($chatId: ID, $msgId: ID){
    deleteChat(chatId: $chatId, msgId: $msgId)
}
`

export const CREATE_GIG_MUTATION = gql`
    mutation CreateGig($itemInput: ItemInput, $file: Upload){
        createGig(itemInput: $itemInput, file: $file)
    }
`

export const UPDATE_GIG_MUTATION = gql`
    mutation UpdateGig($itemInput: ItemInput, $file: Upload, $itemId: String){
        updateGig(itemInput: $itemInput, file: $file, itemId: $itemId)
    }
`

export const DELETE_GIG_MUTATION = gql`
          mutation DeleteGig($itemId: ID){
            deleteGig(itemId: $itemId)
          }
      `;

export const LIKE_PORTFOLIO_ITEM_MUTATION = gql`
    mutation LikePortfolioItem($docId: ID, $username: String){
        likePortfolioItem(docId: $docId, username: $username)
    }
`

export const UNLIKE_LIKE_MUTATION = gql`
    mutation Unlike($docId: ID, $docName: String){
        unlike(docId: $docId, docName: $docName)
    }
`

export const DELETE_MESSAGE_MUTATION = gql`
mutation DeleteMessage($itemId: ID){
    deleteMessage(itemId: $itemId)
}`

export const DELETE_COMMENT_MUTATION = gql`
mutation DeleteComment($itemId: ID){
    deleteComment(itemId: $itemId)
}`