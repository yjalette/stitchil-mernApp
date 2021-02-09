import gql from 'graphql-tag';

export const EXPLORE_ITEMS_QUERY = gql`
    query explore_items($filters: Filters, $price: Price, $page: Int){
        explore_items(filters: $filters, price: $price, page: $page){
                _id
                title
                coverImage
                price
                category
                styles
                fabrics
                delivery
                creator {
                    username
                    profileImage
                   country
                   rating
                }


        }
    }
`



