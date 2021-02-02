const { gql } = require("apollo-server-express");


module.exports = gql`




type Query { 
    view_gig(id: ID): Gig       
    profile_gigs(username: String): [Gig]
    filter_gigs(keyWords: String, categories: [String],garmentType: [String], minPrice: Int, maxPrice: Int, sortBy: String, limit: Int): [Gig]       
}

type Mutation {
    createGig(itemInput: ItemInput, files: [Upload]): Boolean 
    updateGig(itemInput: ItemInput, files: [Upload]): Boolean 
    deleteGig(itemId: ID): Boolean 
}






`;


