import gql from 'graphql-tag';

export const SEARCH_ITEMS_QUERY = gql`
    query search_gigs($filters: Filters, $page: Int){
        search_gigs(filters: $filters, page: $page){
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
