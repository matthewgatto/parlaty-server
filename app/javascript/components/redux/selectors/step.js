export const getStepMap = ({steps}) => steps.byId;
export const getStepForms = ({steps}) => steps.forms;
export const getStepMeta = ({steps}) => steps.open;
export const getLastStepFormId = ({steps:{forms}}) => forms[forms.length - 1] && forms[forms.length - 1].formId;
export const getStepById = (id) => (state) => state.steps.byId[id];
export const getStepFormData = (id, idx) => ({steps, template}) => ({storeValues: steps.byId[id], ...steps.forms[idx], formValues: {...template[idx]} });
export const getPrevStepFormId = (idx) => ({steps:{forms}}) => forms[idx-1] ? forms[idx-1].formId : null;
export const getStepsByIds = (ids) => (state) => ids.map(id => state.steps.byId[id]);
