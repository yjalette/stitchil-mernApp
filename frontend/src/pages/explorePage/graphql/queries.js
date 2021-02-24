import gql from 'graphql-tag';

export const EXPLORE_ITEMS_QUERY = gql`
    query explore_items($filters: Filters, $page: Int){
        explore_items(filters: $filters, page: $page){
             items {
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
             total
        }
    }
`



