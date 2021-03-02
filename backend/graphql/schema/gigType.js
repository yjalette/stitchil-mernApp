const { gql } = require("apollo-server-express");


module.exports = gql`

type GigResult {
    items: [Gig]
    total: Int
}

input Filters {
    category: [String]
    styles: [String]
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
    view_gig(id: ID): Gig
    explore_gigs(filters: Filters, page: Int): GigResult 
    search_gigs(filters: Filters, page: Int): GigResult               
}

type Mutation {
    createGig(itemInput: ItemInput, files: [Upload]): Boolean 
    updateGig(itemInput: ItemInput, files: [Upload]): Boolean 
    deleteGig(itemId: ID): Boolean 
}






`;


