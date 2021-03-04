const { gql } = require("apollo-server-express");


module.exports = gql`

type Query {   
    view_portfolio_item(id: ID): PortfolioItem 
}

type Mutation {    
    create_portfolio_item(itemInput: ItemInput, files: [Upload]): PortfolioItem
    update_portfolio_item(itemInput: ItemInput, files: [Upload]): Boolean
    delete_portfolio_item(itemId: ID): Boolean 
    like_portfolio_item(docId: ID, username: String): Boolean  
}



`;


