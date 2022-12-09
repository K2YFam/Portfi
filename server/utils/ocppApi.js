//npm install api --save
require('dotenv').config();
const sdk = require('api')('@edrv/v1.1#ha9zwlbauw2en');
const apiKey = process.env.OCPP_API;


sdk.auth(apiKey);

let status = async (stationId, portId) => {
  let stationStatus = false;
  let activeSession = false;
  let activeSessionId = '';
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
  return { stationStatus, activeSession, activeSessionId }

}



// let stationData = (stationIdInput) => {
//   let data;
//   sdk.getChargeStation({ id: stationIdInput })
//   .then(({ x }) => {
//     console.log(x);
//     data = x;
//   })
//   .catch(err => console.error(err));
//   return data;
// }

module.exports = {
  status, 

};