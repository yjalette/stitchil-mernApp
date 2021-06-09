
const authResolver = require('./auth/resolver');
const chatResolver = require('./chat/resolver');
const contactResolver = require('./contact/resolver');
const userResolver = require('./user/resolver');
const gigResolver = require('./gig/resolver');
const commentResolver = require('./comment/resolver');
const designerResolver = require('./designer/resolver');
const itemResolver = require('./item/resolver');
const AuthResult = require('./auth/authResult');

const resolvers = {
    Query: {
        ...authResolver.Query,
        ...gigResolver.Query,
        // ...designerResolver.Query,
        ...userResolver.Query,
        ...chatResolver.Query,
        ...commentResolver.Query,
        ...itemResolver.Query
    },
    Mutation: {
        ...authResolver.Mutation,
        ...designerResolver.Mutation,
        ...userResolver.Mutation,
        ...contactResolver.Mutation,
        ...chatResolver.Mutation,
        ...commentResolver.Mutation,
        ...itemResolver.Mutation,
        ...gigResolver.Mutation
    },
    Subscription: {
        ...chatResolver.Subscription
    },
    AuthResult,
    Response: {
        __resolveType(obj) {
            if (obj.success) return 'Result';
            if (obj.code) return 'Failure';
            return null;
        }
    }
};

module.exports = resolvers;