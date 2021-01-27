import gql from 'graphql-tag';

export const CREATE_CHAT_MUTATION = gql`
        mutation CreateChat($message: String, $participant: String){
            createChat(message: $message, participant: $participant)
        }
`
