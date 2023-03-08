const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]!
  }



  type Book {
    _id: ID
    title: String
    author: String
    description: String
    image: String
    link: String
  }

  type Book {
    _id: ID!
    authors: [String!]!
    description: String!
    title: String!
    bookId: ID!
    image: String!
    link: String!
  }



  type Auth {
    token: ID!
    user: User
  }
// study how to write queries
  
type Query {
    me: [User]
    
  }

  type Mutation {
    login(email: String!, password: String!): Auth!
    addUser(username: String!, email: String!, password: String!): Auth!
    saveBook(book: BookInput!): User!
    removeBook(bookId: ID!): User!
  }
`;

module.exports = typeDefs;
