export const getAllOemIds = (state) => state.oems.allIds;
export const getOemById = (id) => (state) => state.oems.byId[id];
export const getOemBusinesses = (id) => (state) => {
  const oem = getOemById(id)(state);
  return oem && oem.oem_businesses
}
