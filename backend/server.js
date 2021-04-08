const { ApolloServer } = require("apollo-server-express");
const resolvers = require("./graphql/resolverIndex");
const typeDefs = require("./graphql/schemaIndex");
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

module.exports = new ApolloServer({
    typeDefs,
    resolvers,
    debug: true,
    introspection: true,
    playground: process.env.NODE_ENV !== "production",
    subscriptions: {
        path: '/subscriptions'
    },
    formatError: err => {
        if (err.message.startsWith("TokenExpiredError: ")) throw new Error('token');
        if (err.message.startsWith("userError: ")) throw new Error(err.message)
        else throw new Error(err.message)
    },
    context: async ({ req, res }) => {
        return {
            res,
            pubsub,
            error: req.error,
            isUser: req.isAuth,
            userId: req.userId
        }

    }
});


