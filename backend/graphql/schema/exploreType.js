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

input Filters {
    category: [String]
    styles: [String]
    worldwide: Boolean
    min: Int
    max: Int
}

input Price {
    min: Int
    max: Int
}

type Bid {
    creator: AuthData
    createdAt: String
    updatedAt: String
}


type Query {        
    explore_items(filters: Filters, price: Price, page: Int): [ExploreItem] 
}




`;


