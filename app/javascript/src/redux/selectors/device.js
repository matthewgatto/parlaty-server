export const getActionFields = (state) => state.devices.forms
export const getDeviceMap = (state) => state.devices.byId
export const getAllDeviceIds = (state) => state.devices.allIds
export const getDeviceById = (id) => (state) => getDeviceMap(state)[id];
export const getAllDevices = (state) => getAllDeviceIds(state).map(id => ({value: id, label: getDeviceById(id)(state).name}))
export const getDeviceName = (id) => (state) => {
  const device = getDeviceById(id)(state);
  return device ? device.name : "Crank Handle"
}
