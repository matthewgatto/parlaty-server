export const getActionMap = (state) => state.actions.byId;
export const getActionForms = (state) => state.actions.forms;
export const getActionById = (id) => (state) => state.actions.byId[id];
export const getLastActionId = (state) => state.actions.forms[getActionForms(state).length - 1];
export const getActionFormData = (id, idx) => (state) => ({storeValues: state.actions.byId[id], ...state.actions.forms[idx]})
export const getActionFileList  = (idx) => ({actions:{forms}}) => forms && forms[idx] && forms[idx].localFileList;