export const isAStepFormOpen = ({steps}) => !!steps.open
export const getLastStepId = ({steps}) => steps.forms[steps.forms.length - 1]
export const getStepMap = ({steps}) => steps.byId
export const getVisuals = ({steps}) => steps.images
export const getStepById = (state,id) => getStepMap(state)[id]
export const getStepDataIfOpen = ({steps:{open}},id) => open && open.id === id ? open : false
export const getStepFormData = (id) => (state) => ({initialValue: getStepById(state,id), isOpen: getStepDataIfOpen(state,id)})
export const getStepForms = ({steps}) => steps.forms
export const getStepSaveData = ({steps:{open,forms}}) => ({stepMeta: open, idx: forms.findIndex(s => s === open.id)})
