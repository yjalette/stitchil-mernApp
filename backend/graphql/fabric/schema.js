const { gql } = require("apollo-server-express");


module.exports = gql`

type Fabric {
    _id: ID
    name: String
    color: String
    content: String
    image: String
}

input FabricInput {
    _id: ID
    name: String
    color: String
    content: String
    image: String
}

type Query { 
    fabrics(ids: [ID]): [Fabric] 
    fabric_library: [Fabric]           
}

type Mutation {
    create_fabric(fabricInput: FabricInput, file: Upload): Fabric
    update_fabric(fabricInput: FabricInput, file: Upload): Fabric
    delete_fabric(fabricId: ID): Boolean
}


`;


