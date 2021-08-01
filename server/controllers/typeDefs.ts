const { gql } = require('apollo-server-express')

const typeDefs = gql`
type User {
    id: ID!
    username: String!
    email: String!
    token: String!
}
type File {
    url: String!
}
type Query {
    user(id:ID!): User! 
}
type Mutation {
    singleUpload(file: Upload!): File!
}
`

export default typeDefs