const { gql } = require("apollo-server-express");


module.exports = gql`

input AddressInput {
    address1: String
    address2: String 
    city: String
    state: String
    zip: Int
    country: String
}

type Query { 
    addressesUser(onlyLatest: Boolean): [Address] 
    address(addressId: ID): Address 
    addressLatest: Address          
}

type Mutation {
    createAddress(addressInput: AddressInput): Address 
    updateAddress(addressInput: AddressInput): Address 
}

`;


