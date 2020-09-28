export const getStepMap = ({steps}) => steps.byId;
export const getStepForms = ({steps}) => steps.forms;
export const getStepMeta = ({steps}) => steps.open;
export const getLastStepFormId = ({steps:{forms}}) => forms[forms.length - 1] && forms[forms.length - 1].formId;
export const getStepById = (id) => (state) => state.steps.byId[id];
export const getStepFormData = (id, idx) => ({steps, template}) => ({storeValues: steps.byId[id], ...steps.forms[idx], formValues: {...template[idx]} });
export const getPrevStepFormId = (idx) => ({steps:{forms}}) => forms[idx-1] ? forms[idx-1].formId : null;
export const getStepsByIds = (ids) => (state) => ids.map(id => state.steps.byId[id]);
export const getCommentsList = (id) => ({steps}) => {
  // debugger;
  return steps.byId[id].comments || [
    {
      id: 1,
      author: 'john smith',
      created_at: '09/24/2020 15:32',
      text: 'unsure how to properly turn the vehicle off',
      read: false,
    },
    {
      id: 2,
      author: 'john2 smith',
      created_at: '09/24/2020 16:31',
      text: '2222 unsure how to properly turn the vehicle off',
      read: false,
    },
    {
      id: 3,
      author: 'john3 smith',
      created_at: '09/24/2020 17:33',
      text: '3333 unsure how to properly turn the vehicle off',
      read: false,
    }
  ];
}
