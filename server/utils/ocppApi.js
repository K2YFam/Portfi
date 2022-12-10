//npm install api --save
require('dotenv').config();
const sdk = require('api')('@edrv/v1.1#ha9zwlbauw2en');
const apiKey = process.env.OCPP_API;
sdk.auth(apiKey);

let status = async (stationId, portId) => {
  let stationStatus = false;
  let activeSession = false;
  let activeSessionId = '';
  let maxAmp = 40; //hard coded for now; dynamic in the future
  await sdk.getSessions({
    status: 'started',
    chargestation: stationId,
    connector: portId,
    paginate_limit: '20',
    paginate_enabled: 'true',
    sort_by: 'createdAt',
    sort_order: 'desc'
  })
    .then(
      ({ data }) => {
        if (data.ok === true) {
          stationStatus = true;
        };
        if (data.totalDocs > 0) {
          activeSession = true;
          activeSessionId = data.result[0]._id;
        };
        console.log(data)
      })
    .catch(err => console.error(err));
  return { stationStatus, maxAmp, activeSession, activeSessionId }

}

let stopCharging = async (activeSessionId) => {
  let response = false
  await sdk.getSessionStop({ id: activeSessionId })
    .then(
      ({ data }) => {
        console.log(data)
        if (data.ok === true) {
          response = true;
        }
      })
    .catch(err => console.error(err));
  return { response }
}

let startCharging = async (userId, portId, chargingLimit) => {
  let response = false;
  let activeSessionId = '';
  let actualChargingLimit = 0;
  await sdk.postSessions({
    target: { state_of_charge: chargingLimit },
    user: userId,
    connector: portId
  })
    .then(
      ({ data }) => {
        console.log(data)
        if (data.ok === true) {
          response = true;
          activeSessionId = data.result._id;
          actualChargingLimit = data.result.target.state_of_charge;
        }
      })
    .catch(err => console.error(err));

  return { response, activeSessionId, actualChargingLimit }
}


module.exports = {
  status,
  stopCharging,
  startCharging,
};