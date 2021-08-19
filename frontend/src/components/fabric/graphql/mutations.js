import gql from 'graphql-tag';

export const FABRIC_UPDATE_MUTATION = gql`
    mutation update_fabric($fabricInput: FabricInput, $file: Upload){
        update_fabric(fabricInput: $fabricInput, , file: $file) {
            _id
            name
            color
            image
            content
        }
}     
`;

export const FABRIC_CREATE_MUTATION = gql`
    mutation create_fabric($fabricInput: FabricInput, $file: Upload){
        create_fabric(fabricInput: $fabricInput, file: $file) {
            _id
            name
            color
            image
            content
        }
}     
`;


export const FABRIC_DELETE_MUTATION = gql`
    mutation delete_fabric($fabricId: ID){
        delete_fabric(fabricId: $fabricId) 
}     
`;
