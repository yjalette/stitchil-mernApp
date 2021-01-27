const { gql } = require("apollo-server-express");


module.exports = gql`

type ExploreResult {
    items: [ExploreItem]
    total: Int
}

interface ExploreItem {
    _id: ID
    title: String
    category: [String]
    styles: [String]
    price: Int
    fabric: [String]
    imageUrl: String
    updatedAt: String
    creator: AuthData
}

type BuyerItem implements ExploreItem{
    _id: ID
    title: String
    category: [String]
    styles: [String]
    price: Int
    fabric: [String]
    imageUrl: String
    updatedAt: String
    creator: AuthData
    bids: [String]
}

type DesignerItem implements ExploreItem {
    _id: ID
    title: String
    category: [String]
    styles: [String]
    price: Int
    fabric: [String]
    imageUrl: String
    updatedAt: String
    creator: AuthData
    delivery: Int
    saved: [String]
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
    explore_items(filters: Filters, price: Price, page: Int): ExploreResult 
}




`;


