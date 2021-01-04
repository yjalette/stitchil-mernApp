const { gql } = require("apollo-server-express");


module.exports = gql`




type Portfolio {
    _id: ID
    public_id: String
    imageUrl: String
    title: String
    description: String
          
}


type DesignerResume {
    style: [String]
    skills: [String]
    experience: [String]
    education: [String]
    about: String
}

input DesignerInput {
    style: [String]
    skills: [String]
    experience: [String]
    education: [String]
    about: String     
}

type PortfolioItem {
    _id: ID
    docId: String
    imageUrl: String
    title: String
    description: String
    likes: [String]
}


type Query {   
    filter_talents(specialties: [String], categories: [String], experience: [String], sortBy: String, limit: Int): [Portfolio] 
    profile_portfolio(username: String): [PortfolioItem] 
    designerResume(portfolioId: String): DesignerResume  
}

type Mutation {    
    updateDesigner(designerInput: DesignerInput): Boolean
    createPortfolioItem(file: Upload, itemInput: ItemInput): Boolean
    updatePortfolioItem(file: Upload, itemId: String, itemInput: ItemInput): Boolean
    deletePortfolioItem(itemId: ID): Boolean 
    likePortfolioItem(docId: ID, username: String): Boolean  
}



`;


