import gql from 'graphql-tag';


export const GIG_QUERY = gql`
        query Gig($listingId: ID){
            gig(listingId: $listingId) {      
                    _id
                    item {
                        _id
                        title
                        description
                        coverImage
                        gallery
                        garment
                        service
                        active
                        group
                        category
                        occasion
                    }
                    packages {
                        _id
                        listingId
                        type
                        fabrics {
                            _id
                            name
                            content
                            color
                            image
                        }
                        price
                        delivery
                        description
                    }
                    shipping_options {
                        _id
                        listingId
                        shippingCarrier
                        shippingPrice
                        mailClass
                        freeShipping
                    }
                    updatedAt
        }  
    }
`