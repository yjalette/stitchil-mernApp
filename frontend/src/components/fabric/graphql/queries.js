import gql from 'graphql-tag';

export const FABRICS_QUERY = gql`
    query fabrics($ids: [ID]){
        fabrics(ids: $ids) {
            _id
                name
                color
                content
                image
        }
}     
`;

export const FABRIC_LIBRARY_QUERY = gql`
    query fabric_library{
        fabric_library{
                _id
                name
                color
                content
                image
        }
}     
`;