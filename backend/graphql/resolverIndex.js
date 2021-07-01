
const authResolver = require('./auth/resolver');
const chatResolver = require('./chat/resolver');
const contactResolver = require('./contact/resolver');
const userResolver = require('./user/resolver');
const gigResolver = require('./gig/resolver');
const productResolver = require('./product/resolver')
const commentResolver = require('./comment/resolver');
const designerResolver = require('./designer/resolver');
const itemResolver = require('./item/resolver');
const packageResolver = require('./package/resolver');
const swatchResolver = require('./swatch/resolver');
const AuthResult = require('./auth/authResult');

const resolvers = {
    Query: {
        ...authResolver.Query,
        ...gigResolver.Query,
        ...productResolver.Query,
        // ...designerResolver.Query,
        ...userResolver.Query,
        ...chatResolver.Query,
        ...commentResolver.Query,
        ...itemResolver.Query,
        ...packageResolver.Query,
        ...swatchResolver.Query
    },
    Mutation: {
        ...authResolver.Mutation,
        ...designerResolver.Mutation,
        ...userResolver.Mutation,
        ...contactResolver.Mutation,
        ...chatResolver.Mutation,
        ...commentResolver.Mutation,
        ...itemResolver.Mutation,
        ...gigResolver.Mutation,
        ...packageResolver.Mutation,
        ...swatchResolver.Mutation
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