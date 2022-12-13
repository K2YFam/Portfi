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
    maxCurrent: Int
    activeSession: Boolean
    activeSessionId: String
    current: Float
    power: Float
  }

  type stopCharging {
    response: Boolean
  }

  type startCharging {
    response: Boolean
    activeSessionId: String
    actualChargingLimit: Int
  }

  type setPower {
    response: Boolean
    actualPowerLimit: Int
    actualPowerLimitUnit: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    chargers(chargerOwner: String!): [Charger]
    charger(id: ID!): Charger
    me: User
    chargerStatus(chargerId: String!, portId: String!): chargerStatus
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addCharger(chargerId: String!, portId: String!): Charger
    removeCharger(id: ID!): Charger
    stopCharging(activeSessionId: String!): stopCharging
    startCharging(userId: String!, portId: String!, chargingLimit: Int): startCharging
    setPower(unit: String!, limit: Int!, activeSessionId: String!): setPower
  }
`;

module.exports = typeDefs;
