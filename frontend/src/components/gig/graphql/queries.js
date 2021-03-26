import gql from 'graphql-tag';

export const GIG_VARIANTS_QUERY = gql`
query gig_variants($itemId: ID){
    gig_variants(itemId: $itemId)  {
            _id
            color
            fabric
            price
            delivery
    }
}
`
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
                        group
                        category
                        occasion
                        keywords
                    }
                    variants {
                        color
                        fabric
                        price
                        delivery
                    }
                    updatedAt
                

        }  
    }
`