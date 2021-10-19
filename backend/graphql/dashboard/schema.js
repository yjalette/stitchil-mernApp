const { gql } = require("apollo-server-express");


module.exports = gql`

type Dashboard {
    orders: [Order]
    gigs: [Gig]
    listings: [Listing]
}

type Query {   
    dashboard: Dashboard  
}

`;

