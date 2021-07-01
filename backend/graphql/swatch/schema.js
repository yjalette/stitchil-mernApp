const { gql } = require("apollo-server-express");


module.exports = gql`

type Swatch {
    _id: ID
    fabric: [String]
    color: [String]
    description: String
    image: String
}

input SwatchInput {
    _id: ID
    fabric: [String]
    color: [String]
    description: String
    image: String
}

type Query { 
    swatches(ids: [ID]): [Swatch] 
    swatch_library: [Swatch]           
}

type Mutation {
    create_swatch(swatchInput: SwatchInput, file: Upload): Swatch
    update_swatch(swatchInput: SwatchInput, file: Upload): Swatch
    delete_swatch(swatchId: ID): Boolean
}


`;


