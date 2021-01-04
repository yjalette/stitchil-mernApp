const { gql } = require("apollo-server-express");


module.exports = gql`



type File {
    _id: ID
    docId: ID
    imageUrl: String
    caption: Caption 
    likes: [String]
}

type Caption {
    title: String
    description: String
}

input CaptionInput {
    title: String
    description: String
}

type Query {
    files(docId: String): [File]
}

type Mutation { 
    uploadProfileImage(file: Upload, image_type: String): Boolean
    deleteProfileImage(image_type: String): Boolean    
    uploadFile(file: Upload, docId: String, captionInput: CaptionInput): String
    updateFile(file: Upload, itemId: String, captionInput: CaptionInput): String
    deleteFile(itemId: ID): Boolean
}




`;


