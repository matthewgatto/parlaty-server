export const getProcedureById = (id) => (state) => state.procedures.byId[id]
export const getProcedureCategories = (id) => state => state.procedures.byId[id] && state.procedures.byId[id].oem_businesses
