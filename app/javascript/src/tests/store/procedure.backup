import reducer, {
  saveStep,
  SAVE_STEP_REQUEST,
  ADD_STEP_REQUEST__SUCCESS,
  EDIT_STEP_REQUEST__SUCCESS,
  reorderStep,
  REORDER_STEP,
  removeImage,
  REMOVE_IMAGE,
  createProcedure,
  CREATE_PROCEDURE_REQUEST,
  deleteStep,
  DELETE_STEP,
  duplicateStep,
  DUPLICATE_STEP,
  initialState
} from '../../store/procedure'

const steps = [{id: 0, title: 'Test 1', number: 1, image: "google.com"}, {id: 1, title: 'Test 2', number: 2, image: "google.com"}, {id: 2, title: 'Test 3', number: 3, image: "google.com"}, {id: 3, title: 'Test 4', number: 4, image: "google.com"}]

describe('procedure actions', () => {
  it('should create an action to add a step to a procedure', () => {
    expect(saveStep()).toEqual({type: SAVE_STEP_REQUEST})
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

describe('procedure reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle ADD_STEP_REQUEST__SUCCESS', () => {
    expect(
      reducer(undefined, {
        type: ADD_STEP_REQUEST__SUCCESS,
        payload: {step: {number: 1}}
      })
    ).toEqual({
      ...initialState,
      steps: [{number: 1}]
    })

    expect(
      reducer({...initialState, steps: [{id: 0, number: 1}]}, {
        type: ADD_STEP_REQUEST__SUCCESS,
        payload: {step: {id: 1, number: 1}}
      })
    ).toEqual({
      ...initialState,
      steps: [{id: 1, number: 1}, {id: 0, number: 2}]
    })

    expect(
      reducer({...initialState, steps: [{id: 0, number: 1}]}, {
        type: ADD_STEP_REQUEST__SUCCESS,
        payload: {step: {id: 1, number: 2}}
      })
    ).toEqual({
      ...initialState,
      steps: [{id: 0, number: 1}, {id: 1, number: 2}]
    })
  })

  it('should handle REORDER_STEP', () => {
    expect(
      reducer({...initialState, steps}, {
        type: REORDER_STEP,
        payload: {fromIdx: 3, toIdx: 1}
      })
    ).toEqual({
      ...initialState,
      steps: [{id: 0, title: "Test 1", number: 1, image: "google.com"}, {id: 3, title: "Test 4", number: 2, image: "google.com"}, {id: 1, title: "Test 2", number: 3, image: "google.com"}, {id: 2, title: "Test 3", number: 4, image: "google.com"}]
    })
    expect(
      reducer({...initialState, steps}, {
        type: REORDER_STEP,
        payload: {fromIdx: 0, toIdx: 2}
      })
    ).toEqual({
      ...initialState,
      steps: [{id: 1, title: "Test 2", number: 1, image: "google.com"}, {id: 2, title: "Test 3", number: 2, image: "google.com"}, {id: 0, title: "Test 1", number: 3, image: "google.com"}, {id: 3, title: "Test 4", number: 4, image: "google.com"}]
    })
  })

  it('should handle REMOVE_IMAGE', () => {
    expect(
      reducer({...initialState, steps}, {
        type: REMOVE_IMAGE,
        payload: 0
      })
    ).toEqual({
      ...initialState,
      steps: [{id: 0, title: "Test 1", number: 1}, {id: 1, title: "Test 2", number: 2, image: "google.com"}, {id: 2, title: "Test 3", number: 3, image: "google.com"}, {id: 3, title: "Test 4", number: 4, image: "google.com"}]
    })
  })

  it('should handle DELETE_STEP', () => {
    expect(
      reducer({...initialState, steps}, {
        type: DELETE_STEP,
        payload: 0
      })
    ).toEqual({
      ...initialState,
      steps: [{id: 1, title: "Test 2", number: 1, image: "google.com"}, {id: 2, title: "Test 3", number: 2, image: "google.com"}, {id: 3, title: "Test 4", number: 3, image: "google.com"}]
    })
    expect(
      reducer({...initialState, steps}, {
        type: DELETE_STEP,
        payload: 1
      })
    ).toEqual({
      ...initialState,
      steps: [{id: 0, title: "Test 1", number: 1, image: "google.com"}, {id: 2, title: "Test 3", number: 2, image: "google.com"}, {id: 3, title: "Test 4", number: 3, image: "google.com"}]
    })
    expect(
      reducer({...initialState, steps}, {
        type: DELETE_STEP,
        payload: 3
      })
    ).toEqual({
      ...initialState,
      steps: [{id: 0, title: "Test 1", number: 1, image: "google.com"}, {id: 1, title: "Test 2", number: 2, image: "google.com"}, {id: 2, title: "Test 3", number: 3, image: "google.com"}]
    })
  })
  it('should handle DUPLICATE_STEP', () => {
    expect(
      reducer({...initialState, steps}, {
        type: DUPLICATE_STEP,
        payload: 0
      })
    ).toEqual({
      ...initialState,
      steps: [{id: 0, title: "Test 1", number: 1, image: "google.com"}, {id: 1, title: "Test 2", number: 2, image: "google.com"}, {id: 2, title: "Test 3", number: 3, image: "google.com"}, {id: 3, title: "Test 4", number: 4, image: "google.com"}, {id: expect.any(Number), number: 5, title: "Test 1", image: "google.com"}]
    })
  })
  it('should handle EDIT_STEP_REQUEST__SUCCESS', () => {
    expect(
      reducer({...initialState, steps}, {
        type: EDIT_STEP_REQUEST__SUCCESS,
        payload: {id: 0, title: "Test 1 edit", number: 1, image: "google.com"}
      })
    ).toEqual({
      ...initialState,
      steps: [{id: 0, title: 'Test 1 edit', number: 1, image: "google.com"}, {id: 1, title: 'Test 2', number: 2, image: "google.com"}, {id: 2, title: 'Test 3', number: 3, image: "google.com"}, {id: 3, title: 'Test 4', number: 4, image: "google.com"}]
    })
    expect(
      reducer({...initialState, steps}, {
        type: EDIT_STEP_REQUEST__SUCCESS,
        payload: {id: 0, title: "Test 1 edit", number: 3, image: "google.com"}
      })
    ).toEqual({
      ...initialState,
      steps: [{id: 1, title: "Test 2", number: 1, image: "google.com"}, {id: 2, title: "Test 3", number: 2, image: "google.com"}, {id: 0, title: "Test 1 edit", number: 3, image: "google.com"}, {id: 3, title: "Test 4", number: 4, image: "google.com"}]
    })
  })
})
