export const getStepMap = ({steps}) => steps.byId
export const getStepForms = ({steps}) => steps.forms
export const getStepMeta = ({steps}) => steps.open
export const getLastStepFormId = ({steps:{forms}}) => forms[forms.length - 1] && forms[forms.length - 1].formId
export const getStepById = ({steps},id) => steps.byId[id]
export const getStepFormData = (id, idx) => ({steps}) => ({storeValues: steps.byId[id], ...steps.forms[idx]})
