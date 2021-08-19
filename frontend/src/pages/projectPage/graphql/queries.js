import gql from 'graphql-tag';

export const PROJECT_QUERY = gql`
    query project($projectId: ID){
        project(projectId: $projectId) {
            _id
         order {
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

         messages {
             _id
             type
             message
             attachments {
                 _id
             }
         }

        }
}     
`;

