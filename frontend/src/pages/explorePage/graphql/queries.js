import gql from 'graphql-tag';

export const EXPLORE_ITEMS_QUERY = gql`
    query explore_items($filters: Filters){
        explore_items(filters: $filters){
                _id
                title
                imageUrl
                price
                category
                style
                fabric
                creator {
                    username
                    profileImage
                   country
                   rating
                }
           ... on BuyerItem {
            bids
           }

           ... on DesignerItem {
            delivery
            saved
           }
        }
    }
`


