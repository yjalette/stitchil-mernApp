import gql from 'graphql-tag';

export const CREATE_COMMENT_MUTATION = gql`
        mutation CreateComment($message: String,  $docId: ID){
            createComment(message: $message, docId: $docId)
        }
`
export const DELETE_COMMENT_MUTATION = gql`
mutation DeleteComment($itemId: ID){
    deleteComment(itemId: $itemId)
}
`