const { gql } = require("apollo-server-express");


module.exports = gql`

input PackageInput {
    _id: ID
    itemId: ID
    type: String
    price: Int
    delivery: Int
    fabrics: [String]
    description: String
}

type Query { 
    packages(itemId: ID): [Package]            
}

type Mutation {
    createPackage(packageInput: PackageInput, listingId: ID): Package 
    updatePackage(packageInput: PackageInput, listingId: ID): Package 
    create_package(packageInput: PackageInput, itemId: ID): Package 
    update_package(packageInput: PackageInput, itemId: ID): Package 
}


`;


