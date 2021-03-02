
const productResolver = require('./product');
const authResolver = require('./auth');
const chatResolver = require('./chat');
const contactResolver = require('./contact');
const userResolver = require('./user');
const gigResolver = require('./gigs');
const messageResolver = require('./message');
const commentResolver = require('./comment');
const designerResolver = require('./designer')

const resolvers = {
    Query: {
        ...authResolver.Query,
        ...gigResolver.Query,
        ...productResolver.Query,
        ...userResolver.Query,
        ...chatResolver.Query,
        ...messageResolver.Query,
        ...commentResolver.Query
    },
    Mutation: {
        ...authResolver.Mutation,
        ...gigResolver.Mutation,
        ...productResolver.Mutation,
        ...designerResolver.Mutation,
        ...userResolver.Mutation,
        ...contactResolver.Mutation,
        ...chatResolver.Mutation,
        ...messageResolver.Mutation,
        ...commentResolver.Mutation,
        // ...exploreResolver.Mutation
    },
    AuthResult: authResolver.AuthResult,
    LoginResult: userResolver.LoginResult,
    Response: {
        __resolveType(obj) {
            if (obj.success) return 'Result';
            if (obj.code) return 'Failure';
            return null;
        }
    }
};

module.exports = resolvers;