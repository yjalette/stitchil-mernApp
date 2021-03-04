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
    view_gigs_item(id: ID): Gig
    explore_gigs(filters: Filters, page: Int): GigResult 
    search_gigs(filters: Filters, page: Int): GigResult               
}

type Mutation {
    create_gigs_item(itemInput: ItemInput, files: [Upload]): Gig 
    update_gigs_item(itemInput: ItemInput, files: [Upload]): Boolean 
    delete_gigs_item(itemId: ID): Boolean 
}






`;


