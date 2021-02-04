import gql from 'graphql-tag';

export const UPDATE_DESIGNER_MUTATION = gql`
        mutation UpdateDesigner($designerInput: DesignerInput){
            updateDesigner(designerInput: $designerInput)
            
        }
`
export const CREATE_PRODUCT_MUTATION = gql`
        mutation CreateProduct($itemInput: ItemInput,  $files: [Upload] ) {
            createProduct(itemInput: $itemInput, files: $files)
        }
      `;

export const UPDATE_PRODUCT_MUTATION = gql`
      mutation UpdateProduct($itemInput: ItemInput,  $files: [Upload]  ) {
        updateProduct(itemInput: $itemInput, files: $files )
      }
    `;


export const DELETE_PRODUCT_MUTATION = gql`
          mutation DeleteProduct($itemId: ID){
            deleteProduct(itemId: $itemId)
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
        mutation CreateReview($message: String, $recipient: String, $rating: Int ){
            createReview(message: $message, recipient: $recipient, rating: $rating)
        }
`


export const CREATE_GIG_MUTATION = gql`
    mutation CreateGig($itemInput: ItemInput, $files: [Upload] ){
        createGig(itemInput: $itemInput, files: $files)
    }
`

export const UPDATE_GIG_MUTATION = gql`
    mutation UpdateGig($itemInput: ItemInput, $files: [Upload] ){
        updateGig(itemInput: $itemInput, files: $files)
    }
`

export const DELETE_GIG_MUTATION = gql`
          mutation DeleteGig($itemId: ID){
            deleteGig(itemId: $itemId)
          }
      `;

export const LIKE_PRODUCT_MUTATION = gql`
    mutation LikeProduct($docId: ID, $username: String){
        likeProduct(docId: $docId, username: $username)
    }
`

