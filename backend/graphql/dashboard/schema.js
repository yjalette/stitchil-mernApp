const { gql } = require("apollo-server-express");


module.exports = gql`

type Dashboard {
    orders: [Order]
}

type Query {   
    dashboard: Dashboard  
}

`;

