import gql from 'graphql-tag';


export const LISTING_QUERY = gql`
        query Listing($listingId: ID){
            listing(listingId: $listingId) {      
                    _id
                    listingType
                    active
                    details {
                        _id
                        title
                        description
                        implementation
                        garment
                        category
                        occasion
                    }
                    gallery {
                        _id
                        url
                        public_id
                    }
                    variations {
                        _id
                        variationName
                        options {
                            _id
                            name
                            note
                            imageId
                            priceIncrease
                        }
                    }
                    shipping_options {
                        _id
                        shippingCarrier
                        shippingPrice
                        mailClass
                        freeShipping
                    }
                    updatedAt
        }  
    }
`