
import gql from 'graphql-tag';

export const VIEW_GIGS_ITEM_QUERY = gql`
query view_gigs_item($id: ID){
    view_gigs_item(id: $id) {
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
        keywords
        createdAt
        
    }
}

`