export const getAllOEMIds = (state) => state.oems.allIds;
export const getOEMById = (id) => (state) => state.oems.byId[id];
export const getOEMBusinesses = (id) => (state) => {
  const oem = getOEMById(id)(state);
  return oem && oem.businesses
}
