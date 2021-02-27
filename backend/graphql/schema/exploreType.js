const { gql } = require("apollo-server-express");


module.exports = gql`

type ExploreItem {
    _id: ID
    title: String
    category: [String]
    styles: [String]
    price: Int
    fabrics: [String]
    delivery: Int
    coverImage: String
    updatedAt: String
    creator: AuthData
}

type ExploreResult {
    items: [ExploreItem]
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
    explore_items(filters: Filters, page: Int): ExploreResult 
}




`;


