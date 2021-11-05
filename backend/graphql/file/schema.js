const { gql } = require("apollo-server-express");


module.exports = gql`


type Query {   
    files(docId: ID): [File]  
}

type Mutation {    
    uploadSingleFile(docId: ID, file: Upload): File 
    uploadFiles(docId: ID, files: [Upload]): [File] 
    updateFiles(updatedFilesIds: [ID], docId: ID): [File]
    reorderFiles(fileIds: [ID]): [File]
    deleteSingleFile(public_id: ID): Boolean
    deleteFiles(fileIds: [ID]): Boolean
}

`;
