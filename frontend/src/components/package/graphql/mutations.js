import gql from 'graphql-tag';

export const PACKAGE_UPDATE_MUTATION = gql`
    mutation update_package($packageInput: PackageInput, $itemId: ID){
        update_package(packageInput: $packageInput, itemId: $itemId) {
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
`;

export const PACKAGE_CREATE_MUTATION = gql`
    mutation create_package($packageInput: PackageInput, $itemId: ID){
        create_package(packageInput: $packageInput, itemId: $itemId) {
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
`;
