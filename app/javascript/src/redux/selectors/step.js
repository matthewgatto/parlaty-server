export const getStepMap = (state) => state.steps.byId
export const getVisuals = (state) => state.steps.visuals
export const getStepForms = (state) => state.steps.forms
export const getStepMeta = (state) => state.steps.open
export const getLastStepId = (state) => state.steps.forms[state.steps.forms.length - 1] && state.steps.forms[state.steps.forms.length - 1].id
export const getStepById = (state,id) => getStepMap(state)[id]

export const getStepDataIfOpen = (state,id) => {
  const stepMeta = getStepMeta(state);
  return stepMeta && stepMeta.id === id ? stepMeta : false
}
export const getStepFormData = (id, idx) => (state) => {
  return({storeValues: getStepById(state,id), ...state.steps.forms[idx]})
}
