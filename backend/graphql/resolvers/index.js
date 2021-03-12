
const authResolver = require('./auth');
const chatResolver = require('./chat');
const contactResolver = require('./contact');
const userResolver = require('./user');
const gigResolver = require('./gigs');
const messageResolver = require('./message');
const commentResolver = require('./comment');
const designerResolver = require('./designer');
const itemResolver = require('./item');

const resolvers = {
    Query: {
        ...authResolver.Query,
        ...gigResolver.Query,
        ...designerResolver.Query,
        ...userResolver.Query,
        ...chatResolver.Query,
        ...messageResolver.Query,
        ...commentResolver.Query,
        ...itemResolver.Query
    },
    Mutation: {
        ...authResolver.Mutation,
        ...designerResolver.Mutation,
        ...userResolver.Mutation,
        ...contactResolver.Mutation,
        ...chatResolver.Mutation,
        ...messageResolver.Mutation,
        ...commentResolver.Mutation,
        ...itemResolver.Mutation
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