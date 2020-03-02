export const getAllIds = (state) => state.businesses.allIds
export const getBusinessMap = (state) => state.businesses.byId
export const getBusinessById = (id) => (state) => state.businesses.byId[id]
export const getBusinessProcedures = (id) => (state) => state.businesses.byId[id] && state.businesses.byId[id].procedures

export const getBusinessProceduresWithDevices = (id) => ({businesses,procedures,devices,actions}) => ({businesses:businesses.byId,procedures:procedures.byId,devices:devices.byId,actions:actions.byId})
/*
export const getBusinessProceduresWithDevices = (id) => (state) => {
  const business = state.businesses.byId[id];
  if(business && business.procedures && business.procedures.length > 0){
    const businessProcedures = [];
    for (var i = 0; i < business.procedures.length; i++) {
      if(state.procedures.byId[business.procedures[i]].devices && state.procedures.byId[business.procedures[i]].devices.length > 0){
        const procedure = {
          ...state.procedures.byId[business.procedures[i]],
          devices: state.procedures.byId[business.procedures[i]].devices.map(deviceId => {
            const device = state.devices.byId[deviceId];
            if(device.actions){
              return {
                ...device,
                actions: device.actions.map(actionId => state.actions.byId[actionId])
              }
            }
            return device
          })
        }
        console.log("PROEDURE PUSH", procedure);
        businessProcedures.push(procedure);
      }
    }
    return businessProcedures;
  }
  return null;
}


export const getBusinessProceduresWithDevices = (id) => (state) => {
  const business = state.businesses.byId[id];
  if(business && business.procedures && business.procedures.length > 0){
    const businessProcedures = [];
    for (var i = 0; i < business.procedures.length; i++) {
      const {devices,...procedure} = state.procedures.byId[business.procedures[i]];
      console.log("getBusinessProceduresWithDevices procedure", procedure);
      console.log("getBusinessProceduresWithDevices devices", devices);
      if(devices && devices.length > 0){
        procedure.devices = devices.map(deviceId => state.devices.byId[deviceId])
        for (var j = 0; j < procedure.devices.length; j++) {
          if(procedure.devices[j].actions){
            procedure.devices[j].actions.map(actionId => state.actions.byId[actionId])
          }
        }
        businessProcedures.push(procedure);
      }
    }
    return businessProcedures;
  }
  return null;
}
*/
