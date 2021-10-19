const { gql } = require("apollo-server-express");


module.exports = gql`

input ItemInput {
    _id: ID
    group: String
    service: [String]
    title: String
    description: String
    category: [String]
    garment: [String]
    occasion: [String]
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
    create_item_overview(itemInput: ItemInput, group: String): ID 
    update_item_overview(itemInput: ItemInput, itemId: ID): Boolean 
    create_item_gallery(itemId: ID, files: [Upload]): [String] 
    update_item_gallery(itemId: ID, gallery: [String], files: [Upload], coverImage: String): [String] 
    update_item(itemInput: ItemInput, group: String): Boolean 
    publish_item(itemId: ID): Boolean 
    delete_item(itemId: ID): Boolean 
}

`;

