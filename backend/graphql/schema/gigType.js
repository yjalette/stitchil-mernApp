const { gql } = require("apollo-server-express");


module.exports = gql`

type GigResult {
    items: [Gig]
    total: Int
}

type Gig {
    _id: ID
    title: String
    description: String
    category: [String]
    style: [String]
    garment: [String]
    occasion: [String]
    coverImage: String
    gallery: [String]
    delivery: Int
    keywords: [String]
    creator: AuthData
    createdAt: String
    updatedAt: String
}

input Filters {
    category: [String]
    garment: [String]
    style: [String]
    worldwide: Boolean
    keywords: String
    min: String
    max: String
}

type Bid {
    creator: AuthData
    createdAt: String
    updatedAt: String
}

type Query { 
    view_gigs_item(id: ID): Gig
    explore_gigs(filters: Filters, keywords: [String], page: Int): GigResult             
}

type Mutation {
    create_gigs_item(itemInput: ItemInput, files: [Upload]): Gig 
    update_gigs_item(itemInput: ItemInput, files: [Upload]): Boolean 
    delete_gigs_item(itemId: ID): Boolean 
}






`;


