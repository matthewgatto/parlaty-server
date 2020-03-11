export const getAllIds = (state) => state.businesses.allIds
export const getBusinessMap = (state) => state.businesses.byId
export const getBusinessById = (id) => (state) => state.businesses.byId[id]
export const getBusinessProcedures = (id) => (state) => state.businesses.byId[id] && state.businesses.byId[id].procedures

export const getBusinessProceduresWithDevices = (id) => ({businesses,procedures,devices,actions}) => ({businesses:businesses.byId,procedures:procedures.byId,devices:devices.byId,actions:actions.byId})
