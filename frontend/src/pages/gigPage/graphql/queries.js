
import gql from 'graphql-tag';

export const VIEW_GIG_QUERY = gql`
query view_gig($id: ID){
    view_gig(id: $id) {
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