import gql from 'graphql-tag';

export const SHIPPING_CREATE_MUTATION = gql`
    mutation createShipping($shippingInput: ShippingInput, $listingId: ID){
        createShipping(shippingInput: $shippingInput, listingId: $listingId) {
            _id
            shippingCarrier
            shippingPrice
            mailClass
            freeShipping
        }
}     
`;

export const SHIPPING_UPDATE_MUTATION = gql`
    mutation updateShipping($shippingInput: ShippingInput, $shippingId: ID){
        updateShipping(shippingInput: $shippingInput, shippingId: $shippingId) {
            _id
           shippingCarrier
           shippingPrice
           mailClass
           freeShipping
        }
}     
`;

export const SHIPPING_DELETE_MUTATION = gql`
    mutation deleteShipping($shippingId: ID){
        deleteShipping(shippingId: $shippingId) 
}     
`;

