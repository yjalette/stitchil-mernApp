const { gql } = require("apollo-server-express");


module.exports = gql`




type Query { 
    view_gig(id: ID): Gig              
}

type Mutation {
    createGig(itemInput: ItemInput, files: [Upload]): Boolean 
    updateGig(itemInput: ItemInput, files: [Upload]): Boolean 
    deleteGig(itemId: ID): Boolean 
}






`;


