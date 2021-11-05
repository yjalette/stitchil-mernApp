import gql from 'graphql-tag';

export const CREATE_LISTING_MUTATION = gql`
    mutation createListing($productId: ID, $listingType: String, $listingAttributes: [String]){
        createListing(productId: $productId, listingType: $listingType, listingAttributes: $listingAttributes) 
}     
`;

export const PUBLISH_LISTING_MUTATION = gql`
    mutation publishListing($listingId: ID){
        publishListing(listingId: $listingId) 
}     
`;