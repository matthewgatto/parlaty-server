import reducer, {initialState} from '@reducers/visuals';
import * as types from '@types';

const initialReorderState = [{id: 0, idx: 0, src: "0"}, {id: 1, idx: 1, src: "1"},{id: 2, idx: 2, src: "2"},{id: 3, idx: 3, src: "3"},{id: 4, idx: 4, src: "4"}]
describe('form reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })
  it('should handle REORDER_STEP_REQUEST__SUCCESS to a higher index with an updated visual', () => {
    expect(
      reducer(initialReorderState, {
        type: types.REORDER_STEP_REQUEST__SUCCESS,
        payload: {
          from: 0,
          to: 1,
          visual: {src: "new 0"}
        }
      })
    ).toEqual([{id: 1, idx: 0, src: "1"}, {id: 0, idx: 1, src: "new 0"},{id: 2, idx: 2, src: "2"},{id: 3, idx: 3, src: "3"},{id: 4, idx: 4, src: "4"}])
  })
  it('should handle REORDER_STEP_REQUEST__SUCCESS to a lower index with an updated visual', () => {
    expect(
      reducer(initialReorderState, {
        type: types.REORDER_STEP_REQUEST__SUCCESS,
        payload: {
          from: 1,
          to: 0,
          visual: {src: "new 1"}
        }
      })
    ).toEqual([{id: 1, idx: 0, src: "new 1"},{id: 0, idx: 1, src: "0"},{id: 2, idx: 2, src: "2"},{id: 3, idx: 3, src: "3"},{id: 4, idx: 4, src: "4"}])
  })
  it('should handle REORDER_STEP_REQUEST__SUCCESS to a higher index', () => {
    expect(
      reducer(initialReorderState, {
        type: types.REORDER_STEP_REQUEST__SUCCESS,
        payload: {
          from: 0,
          to: 1
        }
      })
    ).toEqual([{id: 1, idx: 0, src: "1"},{id: 0, idx: 1, src: "0"},{id: 2, idx: 2, src: "2"},{id: 3, idx: 3, src: "3"},{id: 4, idx: 4, src: "4"}])
  })
  it('should handle REORDER_STEP_REQUEST__SUCCESS to a lower index', () => {
    expect(
      reducer(initialReorderState, {
        type: types.REORDER_STEP_REQUEST__SUCCESS,
        payload: {
          from: 1,
          to: 0
        }
      })
    ).toEqual([{id: 1, idx: 0, src: "1"},{id: 0, idx: 1, src: "0"},{id: 2, idx: 2, src: "2"},{id: 3, idx: 3, src: "3"},{id: 4, idx: 4, src: "4"}])
  })

  it('should handle REORDER_STEP_REQUEST__SUCCESS v2', () => {
    expect(
      reducer([{id: 0, idx: 0, src: "0"},{id: 1, idx: 1, src: "1"},{id: 2, idx: 2, src: "2"}], {
        type: types.REORDER_STEP_REQUEST__SUCCESS,
        payload: {
          from: 0,
          to: 3
        }
      })
    ).toEqual([{id: 1, idx: 0, src: "1"},{id: 2, idx: 1, src: "2"},{id: 0, idx: 3, src: "0"}])
  })
  it('should handle REORDER_STEP_REQUEST__SUCCESS v3', () => {
    expect(
      reducer([{id: 1, idx: 1, src: "1"},{id: 2, idx: 2, src: "2"},{id: 3, idx: 3, src: "3"}], {
        type: types.REORDER_STEP_REQUEST__SUCCESS,
        payload: {
          from: 0,
          to: 1
        }
      })
    ).toEqual([{id: 1, idx: 0, src: "1"},{id: 2, idx: 2, src: "2"},{id: 3, idx: 3, src: "3"}])
  })




  it('should handle REORDER_STEP_REQUEST__SUCCESS v6', () => {
    expect(
      reducer([{id: 0, idx: 0, src: "0"},{id: 1, idx: 1, src: "1"},{id: 3, idx: 3, src: "3"}], {
        type: types.REORDER_STEP_REQUEST__SUCCESS,
        payload: {
          from: 1,
          to: 2
        }
      })
    ).toEqual([{id: 0, idx: 0, src: "0"},{id: 1, idx: 2, src: "1"},{id: 3, idx: 3, src: "3"}])
  })

  it('should handle REORDER_STEP_REQUEST__SUCCESS v7', () => {
    expect(
      reducer([{id: 0, idx: 0, src: "0"},{id: 2, idx: 2, src: "2"},{id: 3, idx: 3, src: "3"}], {
        type: types.REORDER_STEP_REQUEST__SUCCESS,
        payload: {
          from: 0,
          to: 3
        }
      })
    ).toEqual([{id: 2, idx: 1, src: "2"},{id: 3, idx: 2, src: "3"},{id: 0, idx: 3, src: "0"}])
  })

  it('should handle REORDER_STEP_REQUEST__SUCCESS v8', () => {
    expect(
      reducer([{id: 1, idx: 1, src: "1"},{id: 2, idx: 2, src: "2"},{id: 3, idx: 3, src: "3"}], {
        type: types.REORDER_STEP_REQUEST__SUCCESS,
        payload: {
          from: 1,
          to: 0
        }
      })
    ).toEqual([{id: 1, idx: 0, src: "1"},{id: 2, idx: 2, src: "2"},{id: 3, idx: 3, src: "3"}])
  })
  it('should handle REORDER_STEP_REQUEST__SUCCESS', () => {
    expect(
      reducer([{id: 0, idx: 0, src: "0"},{id: 1, idx: 1, src: "1"},{id: 2, idx: 2, src: "2"}], {
        type: types.REORDER_STEP_REQUEST__SUCCESS,
        payload: {
          from: 3,
          to: 0
        }
      })
    ).toEqual([{id: 0, idx: 1, src: "0"},{id: 1, idx: 2, src: "1"},{id: 2, idx: 3, src: "2"}])
  })

  it('should handle REORDER_STEP_REQUEST__SUCCESS v9', () => {
    expect(
      reducer([{id: 0, idx: 0, src: "0"},{id: 1, idx: 1, src: "1"},{id: 2, idx: 2, src: "2"}], {
        type: types.REORDER_STEP_REQUEST__SUCCESS,
        payload: {
          from: 3,
          to: 0,
          visual: {id: 3, idx: 0, src: "3"}
        }
      })
    ).toEqual([{id: 3, idx: 0, src: "3"},{id: 0, idx: 1, src: "0"},{id: 1, idx: 2, src: "1"},{id: 2, idx: 3, src: "2"}])
  })
  it('should handle REORDER_STEP_REQUEST__SUCCESS v11', () => {
    expect(
      reducer([{id: 0, idx: 0, src: "0"},{id: 1, idx: 1, src: "1"},{id: 2, idx: 2, src: "2"},{id: 3, idx: 3, src: "3"}], {
        type: types.REORDER_STEP_REQUEST__SUCCESS,
        payload: {
          from: 5,
          to: 2
        }
      })
    ).toEqual([{id: 0, idx: 0, src: "0"},{id: 1, idx: 1, src: "1"},{id: 2, idx: 3, src: "2"},{id: 3, idx: 4, src: "3"}])
  })
  it('should handle REORDER_STEP_REQUEST__SUCCESS v10', () => {
    expect(
      reducer([{id: 0, idx: 0, src: "0"},{id: 2, idx: 2, src: "2"},{id: 3, idx: 3, src: "3"},{id: 4, idx: 4, src: "4"}], {
        type: types.REORDER_STEP_REQUEST__SUCCESS,
        payload: {
          from: 5,
          to: 3
        }
      })
    ).toEqual([{id: 0, idx: 0, src: "0"},{id: 2, idx: 2, src: "2"},{id: 3, idx: 4, src: "3"},{id: 4, idx: 5, src: "4"}])
  })



  it('should handle REORDER_STEP_REQUEST__SUCCESS v5', () => {
    expect(
      reducer([{id: 1, idx: 1, src: "1"},{id: 2, idx: 2, src: "2"},{id: 3, idx: 3, src: "3"}], {
        type: types.REORDER_STEP_REQUEST__SUCCESS,
        payload: {
          from: 0,
          to: 2,
          visual: {id: 0, idx: 2, src: "0"}
        }
      })
    ).toEqual([{id: 1, idx: 0, src: "1"},{id: 2, idx: 1, src: "2"},{id: 0, idx: 2, src: "0"},{id: 3, idx: 3, src: "3"}])
  })
  it('should handle REORDER_STEP_REQUEST__SUCCESS v12', () => {
    expect(
      reducer([{id: 0, idx: 0, src: "0"},{id: 1, idx: 1, src: "1"},{id: 4, idx: 4, src: "4"},{id: 5, idx: 5, src: "5"}], {
        type: types.REORDER_STEP_REQUEST__SUCCESS,
        payload: {
          from: 2,
          to: 4
        }
      })
    ).toEqual([{id: 0, idx: 0, src: "0"},{id: 1, idx: 1, src: "1"},{id: 4, idx: 3, src: "4"},{id: 5, idx: 5, src: "5"}])
  })
  it('should handle REORDER_STEP_REQUEST__SUCCESS v4', () => {
    expect(
      reducer([{id: 0, idx: 0, src: "0"},{id: 1, idx: 1, src: "1"},{id: 3, idx: 3, src: "3"}], {
        type: types.REORDER_STEP_REQUEST__SUCCESS,
        payload: {
          from: 2,
          to: 1
        }
      })
    ).toEqual([{id: 0, idx: 0, src: "0"},{id: 1, idx: 2, src: "1"},{id: 3, idx: 3, src: "3"}])
  })
})
