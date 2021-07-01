import gql from 'graphql-tag';

export const SWATCHES_QUERY = gql`
    query swatches($ids: [ID]){
        swatches(ids: $ids) {
            _id
                fabric
                color
                description
                image
        }
}     
`;

export const SWATCH_LIBRARY_QUERY = gql`
    query swatch_library{
        swatch_library{
                _id
                fabric
                color
                description
                image
        }
}     
`;