import gql from 'graphql-tag';

export const UPLOAD_SINGLE_FILE_MUTATION = gql`
    mutation uploadSingleFile($file: Upload, $docId: ID){
        uploadSingleFile(file: $file, docId: $docId) 
}     
`;

export const UPLOAD_FILES_MUTATION = gql`
    mutation uploadFiles($files: [Upload], $docId: ID){
        uploadFiles(files: $files, docId: $docId) {
            _id
            public_id
            url
        }
}     
`;

export const UPDATE_FILES_MUTATION = gql`
    mutation updateFiles($updatedFilesIds: [ID], $docId: ID){
        updateFiles(updatedFilesIds: $updatedFilesIds, docId: $docId) {
            _id
            public_id
            url
            order
        }
}     
`;

export const REORDER_FILES_MUTATION = gql`
    mutation reorderFiles($fileIds: [ID]){
        reorderFiles(fileIds: $fileIds) 
}     
`;

export const DELETE_SINGLE_FILE_MUTATION = gql`
    mutation deleteSingleFile($public_id: ID){
        deleteSingleFile(public_id: $public_id) 
}     
`;


export const DELETE_FILES_MUTATION = gql`
mutation deleteFiles($fileIds: [ID]){
    deleteFiles(fileIds: $fileIds) 
}     
`;