export const ADD_STEP_REQUEST = "ADD_STEP_REQUEST";
export const ADD_STEP_REQUEST__SUCCESS = "ADD_STEP_REQUEST__SUCCESS";
export const ADD_STEP_REQUEST__FAILURE = "ADD_STEP_REQUEST__FAILURE";
export const REORDER_STEP = "REORDER_STEP";
export const REMOVE_IMAGE = "REMOVE_IMAGE";
export const CREATE_PROCEDURE_REQUEST = "CREATE_PROCEDURE_REQUEST";
export const CREATE_PROCEDURE_REQUEST__SUCCESS = "CREATE_PROCEDURE_REQUEST__SUCCESS";
export const CREATE_PROCEDURE_REQUEST__FAILURE = "CREATE_PROCEDURE_REQUEST__FAILURE";
export const DELETE_STEP = "DELETE_STEP";
export const DUPLICATE_STEP = "DUPLICATE_STEP";


export const addStep = () => ({type: ADD_STEP_REQUEST});
export const reorderStep = (fromIdx, toIdx) => ({type: REORDER_STEP, payload: {fromIdx, toIdx}})
export const removeImage = (stepIdx) => ({type: REMOVE_IMAGE, payload: stepIdx })
export const createProcedure = () => ({type: CREATE_PROCEDURE_REQUEST})
export const deleteStep = (idx) => ({type: DELETE_STEP, payload: idx})
export const duplicateStep = (idx) => ({type: DUPLICATE_STEP, payload: idx})

const initialState = { description: '', title: '', steps: [] };
export default function(previousState = initialState, { type, payload }){
  switch (type) {
    case ADD_STEP_REQUEST__SUCCESS:
      return {
        ...previousState,
        steps: [...previousState.steps.slice(0, payload.step.number - 1), payload.step, ...previousState.steps.slice(payload.step.number - 1)]
      }
    case REORDER_STEP:
      let steps = [...previousState.steps.slice(0, payload.fromIdx), ...previousState.steps.slice(payload.fromIdx + 1)];
      let step = {...previousState.steps[payload.fromIdx]}
      steps.splice(payload.toIdx, 0, step)
      return {
        ...previousState,
        steps
      }
    case REMOVE_IMAGE:
      let stepsArray = previousState.steps.map((step, i) => {
        if(i === payload){
          let { src, ...rest } = step;
          rest.image = null;
          return rest;
        }
        return step;
      })
      return {
        ...previousState,
        steps: stepsArray
      }
    case DELETE_STEP:
      return {
        ...previousState,
        steps: [...previousState.steps.slice(0, payload), ...previousState.steps.slice(payload+1)]
      }
    case DUPLICATE_STEP:
      return {
        ...previousState,
        steps: [...previousState.steps, {...previousState.steps[payload], number: previousState.steps.length + 1}]
      }
    default:
      return previousState;
  }
}
