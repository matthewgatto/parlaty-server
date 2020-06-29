export const getActionFields = (state) => state.devices.forms
export const getDeviceMap = (state) => state.devices.byId
export const getAllDeviceIds = (state) => state.devices.allIds
export const getDeviceById = (id) => (state) =>  state.devices.byId[id];
export const getAllDevices = (state) => state.devices.allIds.map(id => state.devices.byId[id])
