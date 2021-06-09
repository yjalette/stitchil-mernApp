import gql from 'graphql-tag';

export const EXPLORE_GIGS_QUERY = gql`
    query explore_gigs($filters: Filters, $keywords: [String], $page: Int){
        explore_gigs(filters: $filters, keywords: $keywords, page: $page){
             items {
                _id
                title
                coverImage
                category
                garment 
                occasion
                style
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



