import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import ApolloClient from "apollo-client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from 'apollo-link-context';
import { onError } from "apollo-link-error";
// import { createHttpLink } from "apollo-link-http";

import introspectionQueryResultData from './graphql/fragmentTypes.json';

// const httpLink = createUploadLink({
//     uri: process.env.NODE_ENV === "production" ? "/graphql" : "http://localhost:5000/graphql"
// });


const httpLink = createUploadLink({
    uri: process.env.NODE_ENV === "production" ? "https://www.stitchil.com/graphql" : "http://localhost:5000/graphql"
});

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token') ? (JSON.parse(localStorage.getItem('token')) || {}) : null;
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token} ` : "",
        }
    }
});

console.log("client------>", httpLink)

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) graphQLErrors.map(({ message, extensions }) => console.log(`[GraphQL error------>]: Message: ${message}, Location: ${extensions.code}`))
    if (networkError) console.log(`[Network error---->]: ${networkError}`)
});


export const client = new ApolloClient({
    link: errorLink.concat(authLink.concat(httpLink)),
    cache: new InMemoryCache({
        fragmentMatcher,
        addTypename: true
    })
});


