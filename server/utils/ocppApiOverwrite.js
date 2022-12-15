let stationStatus = true;
let activeSession = false;
let activeSessionId = '';
let maxCurrent = 24; //hard coded for now; dynamic in the future
let current = 0;
let power = 0;

let status = (stationId, portId) => {


  return { stationStatus, maxCurrent, current, power, activeSession, activeSessionId };

}

let stopCharging = (activeSessionId) => {
  activeSession = false;
  activeSessionId = '';
  current = 0;
  power = 0;

  let response = true
  
  return { response };
}

let startCharging = async (userId, portId, chargingLimit) => {
  activeSession = true;
  current = 5;
  power = 5*240/1000;

  response = true
  activeSessionId = '53492850gfsdgfsdg234';
  actualChargingLimit = chargingLimit;
  

  return { response, activeSessionId, actualChargingLimit };
}

let setPower = async (unit, limit, activeSessionId) => {
  // activeSession = true;
  // activeSessionId = activeSessionId;
  if (unit==='current') {
    current = limit;
    power = limit*240/1000;
  }
  if (unit==='power') {
    current = parseInt(limit*1000/240);
    power = limit;
  }
  
  let response = true;
  let actualPowerLimit = limit;
  let actualPowerLimitUnit = unit;
  
  return { response, actualPowerLimit, actualPowerLimitUnit };
}
module.exports = {
  status,
  stopCharging,
  startCharging,
  setPower
};

//ORIGINAL API CODE BELOW

// let status = async (stationId, portId) => {
//   let stationStatus = false;
//   let activeSession = false;
//   let activeSessionId = '';
//   let maxCurrent = 40; //hard coded for now; dynamic in the future
//   let current = 0;
//   let power = 0;
//   await sdk.getSessions({
//     status: 'started',
//     chargestation: stationId,
//     connector: portId,
//     paginate_limit: '20',
//     paginate_enabled: 'true',
//     sort_by: 'createdAt',
//     sort_order: 'desc'
//   })
//     .then(
//       ({ data }) => {
//         if (data.ok === true) {
//           stationStatus = true;
//         };
//         if (data.totalDocs > 0) {
//           activeSession = true;
//           activeSessionId = data.result[0]._id; //assume one station only for now
//           current = data.result[0].energy_report.current.value;
//           power = data.result[0].energy_report.power.value;
//         };
//         console.log(data)
//       })
//     .catch(err => console.error(err));
//   return { stationStatus, maxCurrent, current, power, activeSession, activeSessionId };

// }

// let stopCharging = async (activeSessionId) => {
//   let response = false
//   await sdk.getSessionStop({ id: activeSessionId })
//     .then(
//       ({ data }) => {
//         console.log(data)
//         if (data.ok === true) {
//           response = true;
//         }
//       })
//     .catch(err => console.error(err));
//   return { response };
// }

// let startCharging = async (userId, portId, chargingLimit) => {
//   let response = false;
//   let activeSessionId = '';
//   let actualChargingLimit = 0;
//   await sdk.postSessions({
//     target: { state_of_charge: chargingLimit },
//     user: userId,
//     connector: portId
//   })
//     .then(
//       ({ data }) => {
//         console.log(data)
//         if (data.ok === true) {
//           response = true;
//           activeSessionId = data.result._id;
//           actualChargingLimit = data.result.target.state_of_charge;
//         }
//       })
//     .catch(err => console.error(err));

//   return { response, activeSessionId, actualChargingLimit };
// }

// let setPower = async (unit, limit, activeSessionId) => {
//   let response = false;
//   let actualPowerLimit = 0;
//   let actualPowerLimitUnit = '';
//   await sdk.setPowerLimit({ limit: limit, unit: unit }, { id: activeSessionId })
//     .then(({ data }) => {
//       console.log(data)
//       if (data.ok === true) {
//         response = true;
//         actualPowerLimit = data.result.data.limit;
//         actualPowerLimitUnit = data.result.data.unit;
//       }
//     })
//     .catch(err => console.error(err));
//   return { response, actualPowerLimit, actualPowerLimitUnit };
// }


//API OVERWRITE
// let stationStatus = true;
// let activeSession = false;
// let activeSessionId = '';
// let maxCurrent = 24; //hard coded for now; dynamic in the future
// let current = 0;
// let power = 0;

// let status = (stationId, portId) => {


//   return { stationStatus, maxCurrent, current, power, activeSession, activeSessionId };

// }

// let stopCharging = (activeSessionId) => {
//   activeSession = false;
//   activeSessionId = '';
//   current = 0;
//   power = 0;

//   let response = true
  
//   return { response };
// }

// let startCharging = async (userId, portId, chargingLimit) => {
//   activeSession = true;
//   current = 5;
//   power = 5*240/1000;

//   response = true
//   activeSessionId = '53492850gfsdgfsdg234';
//   actualChargingLimit = chargingLimit;
  

//   return { response, activeSessionId, actualChargingLimit };
// }

// let setPower = async (unit, limit, activeSessionId) => {
//   // activeSession = true;
//   // activeSessionId = activeSessionId;
//   if (unit==='current') {
//     current = limit;
//     power = limit*240/1000;
//   }
//   if (unit==='power') {
//     current = parseInt(limit*1000/240);
//     power = limit;
//   }
  
//   let response = true;
//   let actualPowerLimit = limit;
//   let actualPowerLimitUnit = unit;
  
//   return { response, actualPowerLimit, actualPowerLimitUnit };
// }