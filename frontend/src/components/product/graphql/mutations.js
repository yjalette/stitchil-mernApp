import gql from 'graphql-tag';

export const CREATE_PRODUCT_MUTATION = gql`
    mutation createProduct($productInput: ProductInput){
        createProduct(productInput: $productInput) 
}     
`;


export const UPDATE_PRODUCT_MUTATION = gql`
    mutation updateProduct($productInput: ProductInput){
        updateProduct(productInput: $productInput) 
}     
`;