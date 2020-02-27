export const getAllIds = (state) => state.businesses.allIds
export const getBusinessMap = (state) => state.businesses.byId
export const getBusinessById = (id) => (state) => state.businesses.byId[id]
export const getBusinessProcedures = (id) => (state) => state.businesses.byId[id] && state.businesses.byId[id].procedures

export const getBusinessProceduresWithDevices = (id) => (state) => {
  const business = state.businesses.byId[id];
  if(business && business.procedures && business.procedures.length > 0){
    const procedures = [];
    for (var i = 0; i < business.procedures.length; i++) {
      if(state.procedures.byId[business.procedures[i]].devices && state.procedures.byId[business.procedures[i]].devices.length > 0){
        const {devices,...procedure} = state.procedures.byId[business.procedures[i]];
        procedure.devices = devices.map(deviceId => state.devices.byId[deviceId]);
        procedures.push(procedure);
      }
    }
    return procedures;
  }
  return null;
}
