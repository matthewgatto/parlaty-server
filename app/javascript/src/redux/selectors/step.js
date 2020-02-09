export const getStepMap = (state) => state.steps.byId
export const getVisuals = (state) => state.steps.visuals
export const getStepForms = (state) => state.steps.forms
export const getStepMeta = (state) => state.steps.open
export const isAStepFormOpen = (state) => !!getStepMeta(state)
export const getLastStepId = (state) => state.steps.forms[getStepForms(state).length - 1]
export const getStepById = (state,id) => getStepMap(state)[id]

export const getStepDataIfOpen = (state,id) => {
  const stepMeta = getStepMeta(state);
  return stepMeta && stepMeta.id === id ? stepMeta : false
}
export const getStepFormData = (id) => (state) => ({initialValue: getStepById(state,id), isOpen: getStepOpenValue})

export const getStepSaveData = (state) => {
  const stepMeta = getStepMeta(state)
  return({stepMeta, idx: getStepForms(state).findIndex(s => s === stepMeta.id)})
}
