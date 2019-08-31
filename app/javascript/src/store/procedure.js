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

export const initialState = { description: '', title: '', steps: [] };
export default function(previousState = initialState, { type, payload }){
  switch (type) {
    case ADD_STEP_REQUEST__SUCCESS:
      let stepsAfter = previousState.steps.slice(payload.step.number - 1).map(step => ({...step, number: step.number + 1}))
      return {
        ...previousState,
        steps: [...previousState.steps.slice(0, payload.step.number - 1), payload.step, ...stepsAfter]
      }
    case REORDER_STEP:
      let steps;
      let step = {...previousState.steps[payload.fromIdx], number: payload.toIdx + 1}
      if(payload.fromIdx < payload.toIdx){
        let reorderStepsAfter = previousState.steps.slice(payload.fromIdx + 1).map(step => step.number <= payload.toIdx + 1 ? ({...step, number: step.number - 1}) : step)
        steps = [...previousState.steps.slice(0, payload.fromIdx), ...reorderStepsAfter]
      } else {
        let reorderStepsBefore = previousState.steps.slice(0, payload.fromIdx).map(step => step.number >= payload.toIdx + 1 ? ({...step, number: step.number + 1}) : step)
        steps = [...reorderStepsBefore, ...previousState.steps.slice(payload.fromIdx + 1)]
      }
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
      let stepsAfterDeletion = previousState.steps.slice(payload + 1).map(step => ({...step, number: step.number - 1}))
      return {
        ...previousState,
        steps: [...previousState.steps.slice(0, payload), ...stepsAfterDeletion]
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
