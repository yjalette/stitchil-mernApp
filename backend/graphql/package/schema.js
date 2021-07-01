const { gql } = require("apollo-server-express");


module.exports = gql`

type Package {
    _id: ID
    type: String
    itemId: ID
    price: Int
    delivery: Int
    swatches: [ID]
    description: String
}

input PackageInput {
    _id: ID
    itemId: ID
    type: String
    price: Int
    delivery: Int
    swatches: [String]
    description: String
}

type Query { 
    packages(itemId: ID): [Package]            
}

type Mutation {
    create_package(packageInput: PackageInput, itemId: ID): Package 
    update_package(packageInput: PackageInput, itemId: ID): Boolean 
}


`;


