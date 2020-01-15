export const getDeviceById = (id) => ({devices:{byId:{[id]:device}}}) => device
export const getActionFields = ({devices}) => devices.forms
export const getDeviceMap = ({devices}) => devices.byId
export const getAllDevices = ({devices}) => devices.allIds.map(id => ({value: id, label: devices.byId[id].name}))
export const getDeviceName = (id) => (state) => {
  const device = getDeviceById(id)(state);
  return device ? device.name : "Crank Handle"
}
