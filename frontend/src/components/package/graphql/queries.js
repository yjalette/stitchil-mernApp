import gql from 'graphql-tag';

export const PACKAGES_QUERY = gql`
query packages($itemId: ID){
    packages(itemId: $itemId)  {
            _id
            itemId
            type
            fabrics {
                name
                color
                content
                image
            }
            price
            delivery
            description
    }

}
`