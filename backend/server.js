const { ApolloServer } = require("apollo-server-express");
const resolvers = require("./graphql/resolverIndex");
const typeDefs = require("./graphql/schemaIndex");
const { PubSub, withFilter } = require('graphql-subscriptions');
const pubsub = new PubSub();

module.exports = new ApolloServer({
    typeDefs,
    resolvers,
    debug: true,
    introspection: true,
    playground: process.env.NODE_ENV !== "production",
    context: async ({ req, res, connection }) => {
        if (connection) {
            // Operation is a Subscription
            return {
                pubsub
            };
        } else {
            return {
                res,
                pubsub,
                error: req.error,
                userId: req.userId
            }
        }
    },
    formatError: err => {
        console.log("err!!!!---->", err)
        if (err.message.includes("unauthenticated")) throw new Error('unauthenticated');
        if (err.message.startsWith("TokenExpiredError: ")) throw new Error('token');
        if (err.message.startsWith("userError: ")) throw new Error(err.message)
        else throw new Error(err.message)
    },
});


