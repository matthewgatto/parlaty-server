export const allIds = (state) => state.users.allIds;
export const byId = (id) => (state) => state.users.byId[id];
export const getById = (id) => (state) => state.users.byId[id]
