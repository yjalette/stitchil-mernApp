import gql from 'graphql-tag';

export const DASHBOARD_QUERY = gql`
    query dashboard{
        dashboard{
          orders {
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
            orderStatus
          }

        }
}     
`;