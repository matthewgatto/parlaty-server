export const getProcedureById = (id) => (state) => state.procedures.byId[id]
export const getProcedureOemBusinesses = (id) => state => state.procedures.byId[id] && state.procedures.byId[id].oem_businesses
