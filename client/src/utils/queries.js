import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      chargers {
        _id
        chargerOwner
        chargerId
        portId
        createdAt
      }
    }
  }
`;

export const QUERY_THOUGHTS = gql`
query Chargers {
  chargers {
    _id
    chargerOwner
    chargerId
    portId
    createdAt
  }
}
`;

export const QUERY_SINGLE_THOUGHT = gql`
query Charger($chargerId: ID!) {
  charger(id: $chargerId) {
    _id
    chargerOwner
    chargerId
    portId
    createdAt
  }
}

`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      chargers {
        _id
        chargerOwner
        chargerId
        portId
        createdAt
      }
    }
  }
`;
