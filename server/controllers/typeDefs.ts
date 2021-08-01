const { gql } = require('apollo-server-express')

const typeDefs = gql`
type User {
    id: ID!
    username: String!
    email: String!
    token: String!
}
type Query {
    user(id:ID!): User! 
}
`

export default typeDefs