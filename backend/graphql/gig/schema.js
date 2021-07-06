const { gql } = require("apollo-server-express");


module.exports = gql`

type GigResult {
    items: [Gig]
    total: Int
}

type Gig {
    _id: ID
    item: Item
    packages: [Package]
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
    gig(itemId: ID): Gig
    view_gigs_item(id: ID): Gig
    explore_gigs(filters: Filters, keywords: [String], page: Int): GigResult          
}

type Mutation {
    create_gigs_item(itemInput: ItemInput, files: [Upload]): Gig 
    update_gigs_item(itemInput: ItemInput, files: [Upload]): Boolean 
    delete_gigs_item(itemId: ID): Boolean 
}


`;


