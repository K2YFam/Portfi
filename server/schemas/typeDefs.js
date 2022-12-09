const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    chargers: [Charger]!
  }

  type Charger {
    _id: ID
    chargerOwner: String
    chargerId: String
    portId: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    chargers(username: String): [Charger]
    charger(id: ID!): Charger
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addCharger(chargerId: String!, portId: String!): Charger
    removeCharger(id: ID!): Charger
  }
`;

module.exports = typeDefs;
