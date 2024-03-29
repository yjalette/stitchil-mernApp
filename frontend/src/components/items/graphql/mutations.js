import gql from 'graphql-tag';

export default {
    CREATE: gql`
    mutation create_item_overview($itemInput: ItemInput, $group: String){
        create_item_overview(itemInput: $itemInput, group: $group) 
}`,
    UPDATE: gql`
    mutation update_item_overview($itemInput: ItemInput, $itemId: ID){
        update_item_overview(itemInput: $itemInput, itemId: $itemId) 
}`,
    PUBLISH: gql`
mutation publish_item($itemId: ID){
    publish_item(itemId: $itemId) 
}`,

    DELETE: gql`
mutation delete_Item($itemId: ID){
    delete_item(itemId: $itemId)
  }`,
    CREATE_GALLERY: gql`
  mutation create_item_gallery($itemId: ID, $files: [Upload]){
      create_item_gallery(itemId: $itemId, files: $files) 
  }     
`,
    UPDATE_GALLERY: gql`
    mutation update_item_gallery($itemId: ID, $gallery: [String], $files: [Upload], $coverImage: String){
        update_item_gallery(itemId: $itemId, files: $files, gallery: $gallery, coverImage: $coverImage) 
    }     
`


}