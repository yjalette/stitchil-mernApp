import gql from 'graphql-tag';

export const VIEW_PORTFOLIO_ITEM_QUERY = gql`
query view_portfolio_item($id: ID){
    view_portfolio_item(id: $id) {
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