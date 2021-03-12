import gql from 'graphql-tag';

export const CREATE = gql`
        mutation Create_Item($itemInput: ItemInput, $files: [Upload], $group: String ){
            create_item(itemInput: $itemInput, files: $files, group: $group){
                _id
                group
                title
                description
                coverImage
                gallery
                service
                style
                occasion
                category
                garment
                active
                keywords
                createdAt
            }
        }`

export const UPDATE = gql`mutation Update_Item($itemInput: ItemInput, $files: [Upload] ){
            update_item(itemInput: $itemInput, files: $files)
        }
    `
export const DELETE = gql`mutation Delete_Item($itemId: ID){
        delete_item(itemId: $itemId)
      }`
