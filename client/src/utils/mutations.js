import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_THOUGHT = gql`
  mutation addThought($thoughtText: String!) {
    addThought(thoughtText: $thoughtText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation AddCharger($chargerId: String!, $portId: String!) {
    addCharger(chargerId: $chargerId, portId: $portId) {
      _id
      chargerOwner
      chargerId
      portId
      createdAt
    }
  }
`;

export const START_CHARGING = gql`
  mutation StartCharging($userId: String!, $portId: String!, $chargingLimit: Int) {
    startCharging(userId: $userId, portId: $portId, chargingLimit: $chargingLimit) {
      response
      activeSessionId
      actualChargingLimit
    }
  }
`

export const SET_POWER = gql`
  mutation SetPower($limit: Int!, $activeSessionId: String!, $unit: String!) {
    setPower(limit: $limit, activeSessionId: $activeSessionId, unit: $unit) {
      response
      actualPowerLimit
      actualPowerLimitUnit
    }
  }
`

export const STOP_CHARGING = gql`
  mutation StopCharging($activeSessionId: String!) {
    stopCharging(activeSessionId: $activeSessionId) {
      response
    }
  }
`

