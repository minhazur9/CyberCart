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
}
type Query {
    user(id:ID!): User! 
}
type Mutation {
    addProduct(category: String!, name: String!, model: String!, description: String!, price: String!, manufacturer: String!, file: Upload!): Product
    singleUpload(file: Upload!): String
}
`

export default typeDefs