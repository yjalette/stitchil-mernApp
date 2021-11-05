const { gql } = require("apollo-server-express");


module.exports = gql`

type Attribute {
    _id: ID
    attributeName: String
    attributeValue: String
    note: String
}

input AttributeInput {
    _id: ID
    attributeName: String
    attributeValue: String
    note: String
}

type Mutation {
    createAttribute(attributeInput: AttributeInput, listingId: ID): Attribute
    createAttributes(attributesListInput: [AttributeInput], listingId: ID): [Attribute]
    updateAttribute(attributeValue: String, attributeId: ID): Attribute
    deleteAttributes(attributeId_list: [ID]): Boolean
}

`;


