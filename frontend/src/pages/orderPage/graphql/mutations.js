import gql from 'graphql-tag';

export const CREATE_ORDER_MUTATION = gql`
    mutation createOrder($orderInput: OrderInput){
        createOrder(orderInput: $orderInput) 
}     
`;

export const CONFIRM_ORDER_MUTATION = gql`
    mutation confirmOrder($orderId: ID){
        confirmOrder(orderId: $orderId) 
}     
`;