export const getAllIds = (state) => state.oem_businesses.allIds
export const getOemBusinessMap = (state) => state.oem_businesses.byId
export const getOemBusinessById = (id) => (state) => state.oem_businesses.byId[id]
export const getOemBusinessProcedures = (id) => (state) => state.oem_businesses.byId[id] && state.oem_businesses.byId[id].procedures
export const getOemIdByOemBusinessId = (id) => (state) => {console.log(state); return state.oem_businesses.byId[id] && state.oem_businesses.byId[id].oem_id}

export const getOemBusinessProceduresWithDevices = (id) => ({oem_businesses,procedures,devices,actions}) => ({oem_businesses:oem_businesses.byId,procedures:procedures.byId,devices:devices.byId,actions:actions.byId})
