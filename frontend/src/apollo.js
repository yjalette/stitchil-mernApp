import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { ApolloClient, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { createUploadLink } from "apollo-upload-client";
import { setContext } from 'apollo-link-context';
import { onError } from "apollo-link-error";
import introspectionQueryResultData from './graphql/fragmentTypes.json';
import { WebSocketLink } from "@apollo/client/link/ws";
import onLogout from './helpers/onLogout';


const uri = process.env.NODE_ENV === "production" ? "https://www.stitchil.com/graphql" : "http://localhost:5000/graphql"

const httpLink = createUploadLink({
    uri,
    credentials: 'include'
});

const wsLink = new WebSocketLink({
    uri: `ws://localhost:5000/graphql`,
    options: {
        reconnect: true,
        timeout: 30000,
        connectionParams: {
            authToken: "bauuuuu"
        },
    },
});

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: "",
        }
    }
});

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) graphQLErrors
        .map(({ message, extensions }) => {
            if (message.includes("unauthenticated")) return onLogout()
            else return console.log(`[GraphQL error]: Message: ${message}, Location: ${extensions.code}`)
        })
    if (networkError) console.log(`[Network error]: ${Object.values(networkError)}`)
});


export const client = new ApolloClient({
    link: errorLink.concat(authLink.concat(splitLink)),
    cache: new InMemoryCache({
        fragmentMatcher,
        addTypename: true
    })
});




