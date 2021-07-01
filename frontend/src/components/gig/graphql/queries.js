import gql from 'graphql-tag';


export const GIG_QUERY = gql`
        query Gig($itemId: ID){
            gig(itemId: $itemId) {      
                    _id
                    item {
                        _id
                        title
                        description
                        style
                        coverImage
                        gallery
                        garment
                        service
                        active
                        group
                        category
                        occasion
                    }
                    updatedAt
        }  
    }
`