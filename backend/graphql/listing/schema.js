const { gql } = require("apollo-server-express");


module.exports = gql`

type Listing {
    _id: ID
    listingType: String
    active: Boolean
    details: Product
    gallery: [File]
    variations: [Variation]
    shipping_options: [Shipping]
    creator: AuthData
    createdAt: String
    updatedAt: String
}

input ListingInput {
    _id: ID
    implementation: String
    title: String
    description: String
    category: [String]
    garment: String
    occasion: [String]
}

type Query {   
    listing(listingId: ID): Listing  
}

type Mutation {    
    createListing(productId: ID, listingType: String): ID 
    updateListing(listingInput: ListingInput): Boolean 
    publishListing(listingId: ID): Boolean 
    deleteListing(listingId: ID): Boolean 
}

`;

