const AuthResult = require('./auth/authResult');
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
const fabricResolver = require('./fabric/resolver');
const shippingResolver = require('./shipping/resolver');
const orderResolver = require('./order/resolver');
const addressResolver = require('./address/resolver');
const dashboardResolver = require('./dashboard/resolver')
const messageResolver = require('./message/resolver')
const listingResolver = require('./listing/resolver')
const fileResolver = require('./file/resolver')
const variationResolver = require('./variation/resolver')
const attributeResolver = require('./attribute/resolver')


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
        ...fabricResolver.Query,
        ...shippingResolver.Query,
        ...orderResolver.Query,
        ...addressResolver.Query,
        ...dashboardResolver.Query,
        ...messageResolver.Query,
        ...listingResolver.Query
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
        ...fabricResolver.Mutation,
        ...shippingResolver.Mutation,
        ...orderResolver.Mutation,
        ...addressResolver.Mutation,
        ...messageResolver.Mutation,
        ...productResolver.Mutation,
        ...listingResolver.Mutation,
        ...fileResolver.Mutation,
        ...variationResolver.Mutation,
        ...attributeResolver.Mutation
    },
    Subscription: {
        ...chatResolver.Subscription,
        ...messageResolver.Subscription
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