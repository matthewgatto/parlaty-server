export const allIds = (state) => state.languages.allIds;
export const byId = (id) => (state) => state.languages.byId[id];
export const getById = (id) => (state) => state.languages.byId[id];
export const getLanguagesWithName = (state) => state.languages.allIds && state.languages.allIds.map(id => ({value: id, label: state.languages.byId[id].name}))
