import gql from 'graphql-tag';

export const PRODUCT_QUERY = gql`
        query Product($itemId: ID){
            product(itemId: $itemId) {      
                    _id
                    item {
                        _id
                        title
                        description
                        coverImage
                        gallery
                        productType
                        active
                        group
                        category
                    }
                  
                    updatedAt
                

        }  
    }
`