import gql from 'graphql-tag';

export const SHIPPING_UPDATE_MUTATION = gql`
    mutation updateShipping($shippingInput: ShippingInput){
        updateShipping(shippingInput: $shippingInput) {
            _id
           shippingCarrier
           shippingPrice
           mailClass
           freeShipping
        }
}     
`;

export const SHIPPING_CREATE_MUTATION = gql`
    mutation createShipping($shippingInput: ShippingInput, $itemId: ID){
        createShipping(shippingInput: $shippingInput, itemId: $itemId) {
            _id
            shippingCarrier
            shippingPrice
            mailClass
            freeShipping
        }
}     
`;