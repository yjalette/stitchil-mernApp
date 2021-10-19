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
    createAttributes(attributesListInput: [AttributeInput], listingId: ID): [Attribute]
    updateAttributes(attributesListInput: [AttributeInput]): [Attribute]
    deleteAttributes(attributeId_list: [ID]): Boolean
}

`;


