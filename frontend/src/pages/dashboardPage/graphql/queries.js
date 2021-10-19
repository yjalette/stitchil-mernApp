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
            status
          }
          gigs {
            _id
            item {
                _id
                title
                active
            }
            createdAt
          }
          listings {
            _id
            listingType
            active
            details {
                _id
                title
            }
            createdAt
          }
        }
}     
`;