import gql from 'graphql-tag';

export const ACCOUNT_QUERY = gql`
    query userAccount{
        userAccount {
            email
            username
            fullname
            languages
            country  
    }  
}
`