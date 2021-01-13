import gql from 'graphql-tag';

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

export const CREATE_REVIEW_MUTATION = gql`
        mutation CreateReview($reviewInput: ReviewInput, $recipient: String ){
            createReview(reviewInput: $reviewInput, recipient: $recipient)
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

