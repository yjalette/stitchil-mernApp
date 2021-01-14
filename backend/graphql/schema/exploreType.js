const { gql } = require("apollo-server-express");


module.exports = gql`

interface ExploreItem {
    _id: ID
    title: String
    category: [String]
    style: [String]
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
    style: [String]
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
    style: [String]
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
    style: [String]
    minPrice: Int
    maxPrice: Int
}

type Bid {
    creator: AuthData
    createdAt: String
    updatedAt: String
}


type Query {        
    explore_items(filters: Filters): [ExploreItem] 
}




`;


