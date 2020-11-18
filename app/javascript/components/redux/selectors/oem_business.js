export const getAllIds = (state) => state.oem_businesses.allIds;
export const getOemBusinessMap = (state) => state.oem_businesses.byId;
export const getOemBusinessById = (id) => (state) => state.oem_businesses.byId[id];
export const getAllOemBusinessByRole = (id) => state => {
  switch (state.auth.roleable) {
    case 'ParlatyAdmin': return state.procedures.allIds;
    case 'ClientAdminTest': {
      let procedures = null;
      if(state.oems.allIds && state.oems.byId) {
        state.oems.allIds.forEach(oem_id => {
          const oem = state.oems.byId[oem_id];
          procedures = oem.oem_businesses && oem.oem_businesses.filter(oem_b => +oem_b === +id).length ? state.oems.byId[oem_id].procedures_names.map(proc => proc.id) : null;
        });
      } else console.error('oems.allIds or oems.byId is missing');
      return procedures;
    }
    default: return state.oem_businesses.byId[id]
  }
};
export const getOemBusinessProcedures = (id) => (state) => state.oem_businesses.byId[id] && state.oem_businesses.byId[id].procedures;
export const getOemIdByOemBusinessId = (id) => (state) => state.oem_businesses.byId[id] && state.oem_businesses.byId[id].oem_id;
export const getOemBusinessProceduresWithDevices = (id) => ({oem_businesses,procedures,devices,actions}) => ({oem_businesses:oem_businesses.byId,procedures:procedures.byId,devices:devices.byId,actions:actions.byId});
