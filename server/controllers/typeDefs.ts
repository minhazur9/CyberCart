const { gql } = require('apollo-server-express')

const typeDefs = gql`

scalar Upload

type User {
    id: ID!
    username: String!
    email: String!
    token: String!
}
type Product {
    category: String! 
    name: String! 
    model: String!
    description: String!
    price: String!
    manufacturer: String!
    image: String!
    quantity: Int!
}
type Query {
    getProducts(category: String!): [Product!]!
    user(id:ID!): User! 
}
type Mutation {
    addProduct(category: String!, name: String!, model: String!, description: String!, price: String!, manufacturer: String!, image: Upload!, quantity: Int!): Product
    singleUpload(file: Upload!): String
}
`

export default typeDefs