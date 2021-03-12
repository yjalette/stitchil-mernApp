const { gql } = require("apollo-server-express");


module.exports = gql`



type Item {
    _id: ID
    group: String
    title: String
    description: String
    service: [String]
    category: [String]
    garment: [String]
    occasion: [String]
    style: [String]
    coverImage: String
    gallery: [String]
    keywords: [String]
    active: Boolean 
    creator: AuthData
    createdAt: String
    updatedAt: String
}

input ItemInput {
    _id: ID
    group: String
    service: [String]
    title: String
    description: String
    category: [String]
    garment: [String]
    style: [String]
    occasion: [String]
    coverImage: String
    gallery: [String]
    keywords: [String]
}

type DesignerResume {
    styles: [String]
    skills: [String]
    experience: [String]
    education: [String]
    about: String
}


input DesignerInput {
    styles: [String]
    skills: [String]
    experience: [String]
    education: [String]    
}


type Query {   
    item(itemId: ID): Item  
}

type Mutation {    
    create_item(itemInput: ItemInput, files: [Upload], group: String): Item 
    update_item(itemInput: ItemInput, files: [Upload]): Boolean 
    delete_item(itemId: ID): Boolean 
}

`;

