import gql from 'graphql-tag';

export const UPLOAD_SINGLE_FILE_MUTATION = gql`
    mutation uploadSingleFile($file: Upload, $docId: ID){
        uploadSingleFile(file: $file, docId: $docId) 
}     
`;

export const UPLOAD_FILES_MUTATION = gql`
    mutation uploadFiles($files: [Upload], $docId: ID){
        uploadFiles(files: $files, docId: $docId) {
            url
        }
}     
`;

export const DELETE_SINGLE_FILE_MUTATION = gql`
    mutation deleteSingleFile($public_id: ID){
        deleteSingleFile(public_id: $public_id) 
}     
`;