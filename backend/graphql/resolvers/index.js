
const portfolioResolver = require('./portfolio');
const authResolver = require('./auth');
const chatResolver = require('./chat');
const contactResolver = require('./contact');
const userResolver = require('./user');
const gigResolver = require('./gigs');
const messageResolver = require('./message');
const fileResolver = require('./file');
const commentResolver = require('./comment');

const resolvers = {
    AuthResult: authResolver.AuthResult,
    LoginResult: userResolver.LoginResult,
    Response: {
        __resolveType(obj) {
            if (obj.success) return 'Success';
            if (obj.code) return 'Failure';
            return null;
        }
    },
    Query: {
        ...authResolver.Query,
        ...gigResolver.Query,
        ...portfolioResolver.Query,
        ...userResolver.Query,
        ...chatResolver.Query,
        ...messageResolver.Query,
        ...commentResolver.Query,
        ...fileResolver.Query
    },
    Mutation: {
        ...authResolver.Mutation,
        ...gigResolver.Mutation,
        ...portfolioResolver.Mutation,
        ...userResolver.Mutation,
        ...contactResolver.Mutation,
        ...chatResolver.Mutation,
        ...messageResolver.Mutation,
        ...commentResolver.Mutation,
        ...fileResolver.Mutation
    }
};

module.exports = resolvers;