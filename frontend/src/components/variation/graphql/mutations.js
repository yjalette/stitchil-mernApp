import gql from 'graphql-tag';

export const CREATE_VARIATION_MUTATION = gql`
    mutation createVariation($variationInput: VariationInput, $listingId: ID){
        createVariation(variationInput: $variationInput, listingId: $listingId) {
            _id
            variationName
            options{
                _id
                name
                note
                priceIncrease
                imageId
            }
        }
}     
`;


export const UPDATE_VARIATION_MUTATION = gql`
    mutation updateVariation($variationInput: VariationInput, $variationId: ID){
        updateVariation(variationInput: $variationInput, variationId: $variationId) {
            _id
            variationName
            options{
                _id
                name
                note
                priceIncrease
                imageId
            }
        }
}     
`;

export const DELETE_VARIATION_MUTATION = gql`
    mutation deleteVariation($variationId: ID){
        deleteVariation(variationId: $variationId) 
}     
`;