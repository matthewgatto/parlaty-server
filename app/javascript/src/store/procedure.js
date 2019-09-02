export const SAVE_STEP_REQUEST = "SAVE_STEP_REQUEST";
export const ADD_STEP_REQUEST__SUCCESS = "ADD_STEP_REQUEST__SUCCESS";
export const EDIT_STEP_REQUEST__SUCCESS = "EDIT_STEP_REQUEST__SUCCESS";
export const SAVE_STEP_REQUEST__FAILURE = "SAVE_STEP_REQUEST__FAILURE";
export const REORDER_STEP = "REORDER_STEP";
export const REMOVE_IMAGE = "REMOVE_IMAGE";
export const CREATE_PROCEDURE_REQUEST = "CREATE_PROCEDURE_REQUEST";
export const CREATE_PROCEDURE_REQUEST__SUCCESS = "CREATE_PROCEDURE_REQUEST__SUCCESS";
export const CREATE_PROCEDURE_REQUEST__FAILURE = "CREATE_PROCEDURE_REQUEST__FAILURE";
export const DELETE_STEP = "DELETE_STEP";
export const DUPLICATE_STEP = "DUPLICATE_STEP";


export const saveStep = () => ({type: SAVE_STEP_REQUEST});
export const reorderStep = (fromIdx, toIdx) => ({type: REORDER_STEP, payload: {fromIdx, toIdx}})
export const removeImage = (stepIdx) => ({type: REMOVE_IMAGE, payload: stepIdx })
export const createProcedure = () => ({type: CREATE_PROCEDURE_REQUEST})
export const deleteStep = (idx) => ({type: DELETE_STEP, payload: idx})
export const duplicateStep = (idx) => ({type: DUPLICATE_STEP, payload: idx})


function rearrangeSteps(p1, p2, oldSteps, newStep){
  let steps;
  if(p1 < p2){
    let reorderStepsAfter = oldSteps.slice(p1).map(step => step.number <= p2 ? ({...step, number: step.number - 1}) : step)
    steps = [...oldSteps.slice(0, p1 - 1), ...reorderStepsAfter]
  } else {
    let reorderStepsBefore = oldSteps.slice(0, p1 - 1).map(step => step.number >= p2 ? ({...step, number: step.number + 1}) : step)
    steps = [...reorderStepsBefore, ...oldSteps.slice(p1)]
  }
  steps.splice(p2 - 1, 0, newStep)
  return steps;
}

export const initialState = { description: '', title: '', steps: [] };
export default function(previousState = initialState, { type, payload }){
  switch (type) {
    case ADD_STEP_REQUEST__SUCCESS:
      let stepsAfter = previousState.steps.slice(payload.step.number - 1).map(step => ({...step, number: step.number + 1}))
      return {
        ...previousState,
        steps: [...previousState.steps.slice(0, payload.step.number - 1), payload.step, ...stepsAfter]
      }
    case EDIT_STEP_REQUEST__SUCCESS:
      let p1;
      let p2 = payload.number;
      let steps;
      for (var i = 0; i < previousState.steps.length; i++) {
        if(previousState.steps[i].id === payload.id){
          p1 = previousState.steps[i].number;
          break;
        }
      }
      if(p1 !== p2){
        steps = rearrangeSteps(p1, p2, previousState.steps, payload)
      } else {
        steps = previousState.steps.map(step => step.id === payload.id ? payload : step)
      }
      return {
        ...previousState,
        steps
      }
    case REORDER_STEP:
      let step = {...previousState.steps[payload.fromIdx], number: payload.toIdx + 1}
      return {
        ...previousState,
        steps: rearrangeSteps(payload.fromIdx+1, payload.toIdx+1, previousState.steps, step)
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
        steps: [...previousState.steps, {...previousState.steps[payload], id: Date.now(), number: previousState.steps.length + 1}]
      }
    default:
      return previousState;
  }
}
