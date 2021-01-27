import gql from 'graphql-tag';

export const VIEW_PRODUCT_QUERY = gql`
query view_product($id: ID){
    view_product(id: $id) {
        _id
        title
        description
        imageUrl
        coverImage
        gallery
        createdAt
        
    }
}

`