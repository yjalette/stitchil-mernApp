import gql from 'graphql-tag';

export const EXPLORE_ITEMS_QUERY = gql`
    query explore_items($filters: Filters, $price: Price, $page: Int){
        explore_items(filters: $filters, price: $price, page: $page){
            items {
                _id
                title
                imageUrl
                price
                category
                styles
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
        total
        }
    }
`



