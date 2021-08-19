import gql from 'graphql-tag';

export const ORDER_QUERY = gql`
    query order($orderId: ID){
        order(orderId: $orderId) {
            _id
            item {
                _id
                title
                gallery
                description
                service
            }
            package {
                _id
                type
                price
                delivery
            }
            fabric {
                _id
                name
                color
                image
                content
            }
            shipping {
                _id
                shippingCarrier
                mailClass
                shippingPrice
            }
        }
}     
`;

export const ORDER_USER_LIST_QUERY = gql`
    query orderUserList($orderStatus: String){
        orderUserList(orderStatus: $orderStatus) {
            _id
            item {
                _id
                title
            }
            seller {
                username
            }
            buyer {
                username
            }
            createdAt

        }
}     
`;