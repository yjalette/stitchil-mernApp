import gql from 'graphql-tag';

export const SHIPPING_QUERY = gql`
    query shipping($itemId: ID){
        shipping(itemId: $itemId) {
            _id
           itemId
           shippingCarrier
           shippingPrice
           mailClass
           freeShipping
        }
}     
`;