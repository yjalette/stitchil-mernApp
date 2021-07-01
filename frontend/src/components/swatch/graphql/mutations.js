import gql from 'graphql-tag';

export const SWATCH_UPDATE_MUTATION = gql`
    mutation update_swatch($swatchInput: SwatchInput, $file: Upload){
        update_swatch(swatchInput: $swatchInput, , file: $file) {
            _id
            fabric
            color
            image
            description
        }
}     
`;

export const SWATCH_CREATE_MUTATION = gql`
    mutation create_swatch($swatchInput: SwatchInput, $file: Upload){
        create_swatch(swatchInput: $swatchInput, file: $file) {
            _id
            fabric
            color
            image
            description
        }
}     
`;


export const SWATCH_DELETE_MUTATION = gql`
    mutation delete_swatch($swatchId: ID){
        delete_swatch(swatchId: $swatchId) 
}     
`;
