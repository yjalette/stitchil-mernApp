export const PRODUCT_QUERY = gql`
        query Product($itemId: ID){
            product(itemId: $itemId) {      
                    _id
                    item {
                        _id
                        title
                        description
                        style
                        coverImage
                        gallery
                        garment
                        active
                        group
                        category
                        keywords
                    }
                  
                    updatedAt
                

        }  
    }
`