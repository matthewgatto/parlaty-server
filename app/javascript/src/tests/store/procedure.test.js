import {
  addStep,
  ADD_STEP_REQUEST,
  reorderStep,
  REORDER_STEP,
  removeImage,
  REMOVE_IMAGE,
  createProcedure,
  CREATE_PROCEDURE_REQUEST,
  deleteStep,
  DELETE_STEP,
  duplicateStep,
  DUPLICATE_STEP
} from '../../store/procedure'

describe('procedure actions', () => {
  it('should create an action to add a step to a procedure', () => {
    expect(addStep()).toEqual({type: ADD_STEP_REQUEST})
  })
  it('should create an action to reorder a step', () => {
    expect(reorderStep(0, 1)).toEqual({
      type: REORDER_STEP,
      payload: {fromIdx: 0, toIdx: 1}
    })
  })
  it('should create an action to remove an image from a step', () => {
    expect(removeImage(0)).toEqual({
      type: REMOVE_IMAGE,
      payload: 0
    })
  })
  it('should create an action to create a procedure request', () => {
    expect(createProcedure()).toEqual({type: CREATE_PROCEDURE_REQUEST})
  })
  it('should create an action to remove a step', () => {
    expect(deleteStep(0)).toEqual({
      type: DELETE_STEP,
      payload: 0
    })
  })
  it('should create an action to duplicate a step', () => {
    expect(duplicateStep(0)).toEqual({
      type: DUPLICATE_STEP,
      payload: 0
    })
  })
})
