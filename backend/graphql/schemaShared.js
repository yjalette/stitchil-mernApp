const { gql } = require("apollo-server-express");


module.exports = gql`

union Response = Result | Failure

type AuthData {   
    role: String
    username: String
    fullname: String
    profileImage: String
    country: [String]
    rating: Int
    googleAuth: Boolean
}


type PortfolioItem {
    _id: ID
    url: String
    coverImage: String
    gallery: [String]
    title: String
    description: String
    likes: [String]
    createdAt: String
}

type Comment{
    _id: ID
    docId: String
    subject: String
    message: String
    sender: AuthData
    rating: Int
    createdAt: String
}

type Item {
    _id: ID
    group: String
    title: String
    description: String
    service: [String]
    category: [String]
    garment: [String]
    occasion: [String]
    style: [String]
    coverImage: String
    gallery: [String]
    active: Boolean 
    creator: AuthData
    createdAt: String
    updatedAt: String
}

type Package {
    _id: ID
    itemId: ID
    type: String
    price: Int
    delivery: Int
    fabrics: [Fabric]
    description: String
}

type Shipping {
    _id: ID
    itemId: ID
    shippingCarrier: String
    mailClass: String
    shippingPrice: Int
    freeShipping: Boolean
}

type Order {
    _id: ID
    item: Item
    buyer: AuthData
    seller: AuthData
    package: Package
    fabric: Fabric
    shipping: Shipping
    shippingAddress: Address
    orderStatus: String
    createdAt: String
}

type Address {
    _id: ID
    address1: String
    address2: String 
    city: String
    state: String
    zip: Int
    country: String
}


type Failure {
    code: Int
    type: String
    path: String
    field: String
    error: String
    message: String
}


type Result {  
    type: String
    success: Boolean
    message: String
}

type Error {
    code: Int
    type: String
    path: String
    field: String
    message: String
}

type Message {
    _id: ID
    chatId: ID
    message: String
    seen: Boolean
    sender: AuthData
    recipient: AuthData
    createdAt: String
}


`;

