import gql from 'graphql-tag';

export const ITEM_QUERY = gql`
query item($itemId: ID){
    item(itemId: $itemId) {
        _id
        group
        title
        description
        coverImage
        gallery
       service
       occasion
       garment
        category
        style
        keywords
        createdAt
        
    }
}

`