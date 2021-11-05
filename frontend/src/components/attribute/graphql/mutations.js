import gql from 'graphql-tag';

export const ATRRIBUTES_CREATE_MUTATION = gql`
    mutation createAttributes($attributesListInput: [AttributeInput], $listingId: ID){
        createAttributes(attributesListInput: $attributesListInput, listingId: $listingId) {
            _id

        }
}     
`;

export const ATRRIBUTES_UPDATE_MUTATION = gql`
    mutation updateAttributes($attributesListInput: [AttributeInput], $listingId: ID){
        updateAttributes(attributesListInput: $attributesListInput, listingId: $listingId) {
            _id
            attributeName
            attributeValue
           
        }
}     
`;

export const ATRRIBUTE_UPDATE_MUTATION = gql`
    mutation updateAttribute($attributeValue: String, $attributeId: ID){
        updateAttribute(attributeValue: $attributeValue, attributeId: $attributeId) {
            _id
           
        }
}     
`;


