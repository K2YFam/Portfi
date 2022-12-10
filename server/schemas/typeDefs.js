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

  type chargerStatus {
    stationStatus: Boolean
    maxAmp: Int
    activeSession: Boolean
    activeSessionId: String
  }

  type stopCharging {
    response: Boolean
  }

  type startCharging {
    response: Boolean
    activeSessionId: String
    actualChargingLimit: Int
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
    chargerStatus: chargerStatus
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addCharger(chargerId: String!, portId: String!): Charger
    removeCharger(id: ID!): Charger
    stopCharging(activeSessionId: String!): stopCharging
    startCharging(userId: String!, portId: String!, chargingLimit: Int): startCharging
  }
`;

module.exports = typeDefs;
