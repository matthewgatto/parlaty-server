export const getAllOEMIds = (state) => state.oems.allIds;
export const getOEMById = (id) => (state) => state.oems.byId[id];
export const getOemBusinesses = (id) => (state) => {
  const oem = getOEMById(id)(state);
  return oem && oem.oem_businesses
}
