import gql from 'graphql-tag';


export const UPDATE_DESIGNER_MUTATION = gql`
        mutation UpdateDesigner($designerInput: DesignerInput){
            updateDesigner(designerInput: $designerInput)
            
        }
`
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


export const CREATE_GIGS_ITEM_MUTATION = gql`
    mutation CreateGigsItem($itemInput: ItemInput, $files: [Upload] ){
        createGigsItem(itemInput: $itemInput, files: $files){
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
            createdAt
        }
    }
`

export const UPDATE_GIGS_ITEM_MUTATION = gql`
    mutation UpdateGigsItem($itemInput: ItemInput, $files: [Upload] ){
        updateGigsItem(itemInput: $itemInput, files: $files)
    }
`

export const DELETE_GIGS_ITEM_MUTATION = gql`
          mutation DeleteGigsItem($itemId: ID){
            deleteGigsItem(itemId: $itemId)
          }
      `;


export const section_mutation = {
    gigs: {
        CREATE: gql`
        mutation Create_gigs_item($itemInput: ItemInput, $files: [Upload] ){
            create_gigs_item(itemInput: $itemInput, files: $files){
                _id
                title
                description
                coverImage
                gallery
                price
                delivery
                category
                styles
                swatches
                keywords
                createdAt
            }
        }`,
        UPDATE: gql`mutation Update_Gigs_Item($itemInput: ItemInput, $files: [Upload] ){
            update_gigs_item(itemInput: $itemInput, files: $files)
        }
    `,
        DELETE: gql`mutation DeleteGigsItem($itemId: ID){
        delete_gigs_item(itemId: $itemId)
      }`

    },
    portfolio: {
        CREATE: gql` mutation Create_Portfolio_Item($itemInput: ItemInput,  $files: [Upload] ) {
            create_portfolio_item(itemInput: $itemInput, files: $files){
                _id
                coverImage
                gallery
                title
                description
            }
        }
      `,
        UPDATE: gql`
      mutation Update_Portfolio_Item($itemInput: ItemInput,  $files: [Upload]  ) {
        update_portfolio_item(itemInput: $itemInput, files: $files )
      }`,
        DELETE: gql` mutation Delete_portfolio_item($itemId: ID){ delete_portfolio_item(itemId: $itemId)}`

    }
}

export const item_mutation = {
    CREATE: gql`
        mutation Create_Item($itemInput: ItemInput, $files: [Upload], $group: String ){
            create_item(itemInput: $itemInput, files: $files, group: $group){
                _id
                group
                title
                description
                coverImage
                gallery
                occasion
                category
                garment
                active
                keywords
                createdAt
            }
        }`,
    UPDATE: gql`mutation Update_Item($itemInput: ItemInput, $files: [Upload] ){
            update_gigs_item(itemInput: $itemInput, files: $files)
        }
    `,
    DELETE: gql`mutation Delete_Item($itemId: ID){
        delete_item(itemId: $itemId)
      }`
}