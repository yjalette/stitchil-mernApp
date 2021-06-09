import gql from 'graphql-tag';

export const COMMENTS_QUERY = gql`
query comments($docId: ID){
    comments(docId: $docId) {
        _id
        docId
        sender{
            profileImage
            username
        }
        message
        createdAt
    }
}
`