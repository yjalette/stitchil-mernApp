
const productResolver = require('./product');
const authResolver = require('./auth');
const chatResolver = require('./chat');
const contactResolver = require('./contact');
const userResolver = require('./user');
const gigResolver = require('./gigs');
const messageResolver = require('./message');
const fileResolver = require('./file');
const commentResolver = require('./comment');
const exploreResolver = require('./explore');
const designerResolver = require('./designer')

const resolvers = {
    Query: {
        ...authResolver.Query,
        ...gigResolver.Query,
        ...productResolver.Query,
        ...userResolver.Query,
        ...chatResolver.Query,
        ...messageResolver.Query,
        ...commentResolver.Query,
        ...fileResolver.Query,
        ...exploreResolver.Query
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
        ...fileResolver.Mutation,
        // ...exploreResolver.Mutation
    },
    AuthResult: authResolver.AuthResult,
    LoginResult: userResolver.LoginResult,
    ExploreItem: exploreResolver.ExploreItem,
    Response: {
        __resolveType(obj) {
            if (obj.success) return 'Result';
            if (obj.code) return 'Failure';
            return null;
        }
    }
};

module.exports = resolvers;