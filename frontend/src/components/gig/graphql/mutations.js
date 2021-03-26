import gql from 'graphql-tag';

export const GIG_UPDATE_VARIANT_MUTATION = gql`
    mutation update_gig_variant($variantInput: VariantInput, $itemId: ID){
        update_gig_variant(variantInput: $variantInput, itemId: $itemId) 
}     
`;

export const GIG_CREATE_VARIANT_MUTATION = gql`
    mutation create_gig_variant($variantInput: VariantInput, $itemId: ID){
        create_gig_variant(variantInput: $variantInput, itemId: $itemId) 
}     
`;

