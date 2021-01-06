const { gql } = require("apollo-server-express");


module.exports = gql`


type Gig {
    _id: ID
    title: String
    description: String
    category: [String]
    style: [String]
    price: Int
    fabric: [String]
    imageUrl: String
    delivery: Int
    keywords: [String]
    createdAt: String
    updatedAt: String
}



type Query {        
    profile_gigs(username: String): [Gig]
    filter_gigs(keyWords: String, categories: [String],garmentType: [String], minPrice: Int, maxPrice: Int, sortBy: String, limit: Int): [Gig]       
}

type Mutation {
    createGig(itemInput: ItemInput, file: Upload): Boolean 
    updateGig(itemInput: ItemInput, file: Upload, itemId: String): Boolean 
    deleteGig(itemId: ID): Boolean 
}






`;

