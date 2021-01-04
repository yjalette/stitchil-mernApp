const { ApolloServer } = require("apollo-server-express");

const resolvers = require("./graphql/resolvers/index");
const typeDefs = require("./graphql/schema/indexType");

module.exports = new ApolloServer({
    typeDefs,
    resolvers,
    // graphiql: true,
    debug: true,
    // tracing: true,
    introspection: true,
    // playground: true,
    playground: process.env.NODE_ENV !== "production",
    formatError: err => {
        console.log("app js error---->", err)
        if (err.message.startsWith("TokenExpiredError: ")) throw new Error('token');
        if (err.message.startsWith("userError: ")) throw new Error(err.message)
        else throw new Error(err.message)
    },
    context: async ({ req }) => {
        return {
            error: req.error,
            isUser: req.isAuth,
            userId: req.userId
        }

    }
});


