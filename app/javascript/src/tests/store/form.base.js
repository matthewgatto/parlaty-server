
import reducer, {initialState} from '../../redux/reducers/visuals';
import * as types from '../../redux/types';

const initialReorderState = [{id: 0, idx: 0, src: "0"}, {id: 1, idx: 1, src: "1"},{id: 2, idx: 2, src: "2"},{id: 3, idx: 3, src: "3"},{id: 4, idx: 4, src: "4"}]
describe('form reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })
  /*
  it('should handle REORDER_IMAGE to a higher index with an updated visual', () => {
    expect(
      reducer(initialReorderState, {
        type: types.REORDER_IMAGE,
        payload: {
          from: 0,
          to: 1,
          visual: {src: "new 0"}
        }
      })
    ).toEqual([{id: 1, idx: 0, src: "1"}, {id: 0, idx: 1, src: "new 0"},{id: 2, idx: 2, src: "2"},{id: 3, idx: 3, src: "3"},{id: 4, idx: 4, src: "4"}])
  })
  it('should handle REORDER_IMAGE to a lower index with an updated visual', () => {
    expect(
      reducer(initialReorderState, {
        type: types.REORDER_IMAGE,
        payload: {
          from: 1,
          to: 0,
          visual: {src: "new 1"}
        }
      })
    ).toEqual([{id: 1, idx: 0, src: "new 1"},{id: 0, idx: 1, src: "0"},{id: 2, idx: 2, src: "2"},{id: 3, idx: 3, src: "3"},{id: 4, idx: 4, src: "4"}])
  })
  it('should handle REORDER_IMAGE to a higher index', () => {
    expect(
      reducer(initialReorderState, {
        type: types.REORDER_IMAGE,
        payload: {
          from: 0,
          to: 1
        }
      })
    ).toEqual([{id: 1, idx: 0, src: "1"},{id: 0, idx: 1, src: "0"},{id: 2, idx: 2, src: "2"},{id: 3, idx: 3, src: "3"},{id: 4, idx: 4, src: "4"}])
  })
  it('should handle REORDER_IMAGE to a lower index', () => {
    expect(
      reducer(initialReorderState, {
        type: types.REORDER_IMAGE,
        payload: {
          from: 1,
          to: 0
        }
      })
    ).toEqual([{id: 1, idx: 0, src: "1"},{id: 0, idx: 1, src: "0"},{id: 2, idx: 2, src: "2"},{id: 3, idx: 3, src: "3"},{id: 4, idx: 4, src: "4"}])
  })
  it('should handle REORDER_IMAGE', () => {
    expect(
      reducer([{id: 0, idx: 0, src: "0"},{id: 1, idx: 1, src: "1"},{id: 2, idx: 2, src: "2"}], {
        type: types.REORDER_IMAGE,
        payload: {
          from: 3,
          to: 0
        }
      })
    ).toEqual([{id: 0, idx: 1, src: "0"},{id: 1, idx: 2, src: "1"},{id: 2, idx: 3, src: "2"}])
  })
  it('should handle REORDER_IMAGE v2', () => {
    expect(
      reducer([{id: 0, idx: 0, src: "0"},{id: 1, idx: 1, src: "1"},{id: 2, idx: 2, src: "2"}], {
        type: types.REORDER_IMAGE,
        payload: {
          from: 0,
          to: 3
        }
      })
    ).toEqual([{id: 1, idx: 0, src: "1"},{id: 2, idx: 1, src: "2"},{id: 0, idx: 3, src: "0"}])
  })

  it('should handle REORDER_IMAGE v3', () => {
    expect(
      reducer([{id: 1, idx: 1, src: "1"},{id: 2, idx: 2, src: "2"},{id: 3, idx: 3, src: "3"}], {
        type: types.REORDER_IMAGE,
        payload: {
          from: 0,
          to: 1
        }
      })
    ).toEqual([{id: 1, idx: 0, src: "1"},{id: 2, idx: 2, src: "2"},{id: 3, idx: 3, src: "3"}])
  })

  it('should handle REORDER_IMAGE v4', () => {
    expect(
      reducer([{id: 0, idx: 0, src: "0"},{id: 1, idx: 1, src: "1"},{id: 3, idx: 3, src: "3"}], {
        type: types.REORDER_IMAGE,
        payload: {
          from: 2,
          to: 1
        }
      })
    ).toEqual([{id: 0, idx: 0, src: "0"},{id: 1, idx: 2, src: "1"},{id: 3, idx: 3, src: "3"}])
  })

  it('should handle REORDER_IMAGE v5', () => {
    expect(
      reducer([{id: 1, idx: 1, src: "1"},{id: 2, idx: 2, src: "2"},{id: 3, idx: 3, src: "3"}], {
        type: types.REORDER_IMAGE,
        payload: {
          from: 0,
          to: 2,
          visual: {id: 0, idx: 2, src: "0"}
        }
      })
    ).toEqual([{id: 1, idx: 0, src: "1"},{id: 2, idx: 1, src: "2"},{id: 0, idx: 2, src: "0"},{id: 3, idx: 3, src: "3"}])
  })

  it('should handle REORDER_IMAGE v6', () => {
    expect(
      reducer([{id: 0, idx: 0, src: "0"},{id: 1, idx: 1, src: "1"},{id: 3, idx: 3, src: "3"}], {
        type: types.REORDER_IMAGE,
        payload: {
          from: 1,
          to: 2
        }
      })
    ).toEqual([{id: 0, idx: 0, src: "0"},{id: 1, idx: 2, src: "1"},{id: 3, idx: 3, src: "3"}])
  })

  it('should handle REORDER_IMAGE v7', () => {
    expect(
      reducer([{id: 0, idx: 0, src: "0"},{id: 2, idx: 2, src: "2"},{id: 3, idx: 3, src: "3"}], {
        type: types.REORDER_IMAGE,
        payload: {
          from: 0,
          to: 3
        }
      })
    ).toEqual([{id: 2, idx: 1, src: "2"},{id: 3, idx: 2, src: "3"},{id: 0, idx: 3, src: "0"}])
  })

  it('should handle REORDER_IMAGE v8', () => {
    expect(
      reducer([{id: 1, idx: 1, src: "1"},{id: 2, idx: 2, src: "2"},{id: 3, idx: 3, src: "3"}], {
        type: types.REORDER_IMAGE,
        payload: {
          from: 1,
          to: 0
        }
      })
    ).toEqual([{id: 1, idx: 0, src: "1"},{id: 2, idx: 2, src: "2"},{id: 3, idx: 3, src: "3"}])
  })

  it('should handle REORDER_IMAGE v9', () => {
    expect(
      reducer([{id: 0, idx: 0, src: "0"},{id: 1, idx: 1, src: "1"},{id: 2, idx: 2, src: "2"}], {
        type: types.REORDER_IMAGE,
        payload: {
          from: 3,
          to: 0,
          visual: {id: 3, idx: 0, src: "3"}
        }
      })
    ).toEqual([{id: 3, idx: 0, src: "3"},{id: 0, idx: 1, src: "0"},{id: 1, idx: 2, src: "1"},{id: 2, idx: 3, src: "2"}])
  })
  it('should handle REORDER_IMAGE v10', () => {
    expect(
      reducer([{id: 0, idx: 0, src: "0"},{id: 2, idx: 2, src: "2"},{id: 3, idx: 3, src: "3"},{id: 4, idx: 4, src: "4"}], {
        type: types.REORDER_IMAGE,
        payload: {
          from: 5,
          to: 3
        }
      })
    ).toEqual([{id: 0, idx: 0, src: "0"},{id: 2, idx: 2, src: "2"},{id: 3, idx: 4, src: "3"},{id: 4, idx: 5, src: "4"}])
  })
  it('should handle REORDER_IMAGE v11', () => {
    expect(
      reducer([{id: 0, idx: 0, src: "0"},{id: 1, idx: 1, src: "1"},{id: 2, idx: 2, src: "2"},{id: 3, idx: 3, src: "3"}], {
        type: types.REORDER_IMAGE,
        payload: {
          from: 5,
          to: 2
        }
      })
    ).toEqual([{id: 0, idx: 0, src: "0"},{id: 1, idx: 1, src: "1"},{id: 2, idx: 3, src: "2"},{id: 3, idx: 4, src: "3"}])
  })

  it('should handle REORDER_IMAGE v12', () => {
    expect(
      reducer([{id: 0, idx: 0, src: "0"},{id: 1, idx: 1, src: "1"},{id: 4, idx: 4, src: "4"},{id: 5, idx: 5, src: "5"}], {
        type: types.REORDER_IMAGE,
        payload: {
          from: 2,
          to: 4
        }
      })
    ).toEqual([{id: 0, idx: 0, src: "0"},{id: 1, idx: 1, src: "1"},{id: 4, idx: 3, src: "4"},{id: 5, idx: 5, src: "5"}])
  })



  it('should handle REMOVE_IMAGE_AND_REINDEX', () => {
    expect(
      reducer([{id: 0, idx: 0, src: "0"},{id: 1, idx: 1, src: "1"},{id: 2, idx: 2, src: "2"},{id: 3, idx: 3, src: "3"},{id: 4, idx: 4, src: "4"}], {
        type: types.REMOVE_IMAGE_AND_REINDEX,
        payload: {
          from: 3,
          to: 0
        }
      })
    ).toEqual([{id: 0, idx: 1, src: "0"},{id: 1, idx: 2, src: "1"},{id: 2, idx: 3, src: "2"},{id: 4, idx: 4, src: "4"}])
  })
  it('should handle REMOVE_IMAGE_AND_REINDEX v2', () => {
    expect(
      reducer([{id: 0, idx: 0, src: "0"},{id: 1, idx: 1, src: "1"},{id: 2, idx: 2, src: "2"},{id: 3, idx: 3, src: "3"},{id: 4, idx: 4, src: "4"}], {
        type: types.REMOVE_IMAGE_AND_REINDEX,
        payload: {
          from: 0,
          to: 5
        }
      })
    ).toEqual([{id: 1, idx: 0, src: "1"},{id: 2, idx: 1, src: "2"},{id: 3, idx: 2, src: "3"},{id: 4, idx: 3, src: "4"}])
  })
  it('should handle REMOVE_IMAGE_AND_REINDEX v3', () => {
    expect(
      reducer([{id: 0, idx: 0, src: "0"},{id: 1, idx: 1, src: "1"},{id: 2, idx: 2, src: "2"},{id: 3, idx: 3, src: "3"},{id: 4, idx: 4, src: "4"}], {
        type: types.REMOVE_IMAGE_AND_REINDEX,
        payload: {
          from: 0,
          to: 4
        }
      })
    ).toEqual([{id: 1, idx: 0, src: "1"},{id: 2, idx: 1, src: "2"},{id: 3, idx: 2, src: "3"},{id: 4, idx: 3, src: "4"}])
  })
  it('should handle REMOVE_IMAGE_AND_REINDEX v4', () => {
    expect(
      reducer([{id: 0, idx: 0, src: "0"},{id: 1, idx: 1, src: "1"},{id: 2, idx: 2, src: "2"},{id: 3, idx: 3, src: "3"},{id: 4, idx: 4, src: "4"}], {
        type: types.REMOVE_IMAGE_AND_REINDEX,
        payload: {
          from: 0,
          to: 3
        }
      })
    ).toEqual([{id: 1, idx: 0, src: "1"},{id: 2, idx: 1, src: "2"},{id: 3, idx: 2, src: "3"},{id: 4, idx: 4, src: "4"}])
  })
  it('should handle REMOVE_IMAGE_AND_REINDEX v5', () => {
    expect(
      reducer([{id: 0, idx: 0, src: "0"},{id: 1, idx: 1, src: "1"},{id: 2, idx: 2, src: "2"},{id: 3, idx: 3, src: "3"},{id: 4, idx: 4, src: "4"}], {
        type: types.REMOVE_IMAGE_AND_REINDEX,
        payload: {
          from: 4,
          to: 0
        }
      })
    ).toEqual([{id: 0, idx: 1, src: "0"},{id: 1, idx: 2, src: "1"},{id: 2, idx: 3, src: "2"},{id: 3, idx: 4, src: "3"}])
  })
  it('should handle REMOVE_IMAGE_AND_REINDEX v6', () => {
    expect(
      reducer([{id: 0, idx: 0, src: "0"},{id: 1, idx: 1, src: "1"},{id: 2, idx: 2, src: "2"},{id: 3, idx: 3, src: "3"},{id: 4, idx: 4, src: "4"}], {
        type: types.REMOVE_IMAGE_AND_REINDEX,
        payload: {
          from: 4,
          to: 1
        }
      })
    ).toEqual([{id: 0, idx: 0, src: "0"},{id: 1, idx: 2, src: "1"},{id: 2, idx: 3, src: "2"},{id: 3, idx: 4, src: "3"}])
  })
  it('should handle REMOVE_IMAGE_AND_REINDEX v7', () => {
    expect(
      reducer([{id: 0, idx: 0, src: "0"},{id: 1, idx: 1, src: "1"},{id: 2, idx: 2, src: "2"},{id: 3, idx: 3, src: "3"},{id: 4, idx: 4, src: "4"}], {
        type: types.REMOVE_IMAGE_AND_REINDEX,
        payload: {
          from: 3,
          to: 1
        }
      })
    ).toEqual([{id: 0, idx: 0, src: "0"},{id: 1, idx: 2, src: "1"},{id: 2, idx: 3, src: "2"},{id: 4, idx: 4, src: "4"}])
  })
  it('should handle REMOVE_IMAGE_AND_REINDEX v8', () => {
    expect(
      reducer([{id: 0, idx: 0, src: "0"},{id: 1, idx: 1, src: "1"},{id: 2, idx: 2, src: "2"},{id: 3, idx: 3, src: "3"},{id: 6, idx: 6, src: "6"}], {
        type: types.REMOVE_IMAGE_AND_REINDEX,
        payload: {
          from: 0,
          to: 4
        }
      })
    ).toEqual([{id: 1, idx: 0, src: "1"},{id: 2, idx: 1, src: "2"},{id: 3, idx: 2, src: "3"},{id: 6, idx: 6, src: "6"}])
  })
  it('should handle REMOVE_IMAGE_AND_REINDEX v9', () => {
    expect(
      reducer([{id: 0, idx: 0, src: "0"},{id: 2, idx: 2, src: "2"},{id: 3, idx: 3, src: "3"},{id: 4, idx: 4, src: "4"},{id: 5, idx: 5, src: "5"}], {
        type: types.REMOVE_IMAGE_AND_REINDEX,
        payload: {
          from: 5,
          to: 1
        }
      })
    ).toEqual([{id: 0, idx: 0, src: "0"},{id: 2, idx: 3, src: "2"},{id: 3, idx: 4, src: "3"},{id: 4, idx: 5, src: "4"}])
  })
  it('should handle REMOVE_IMAGE_AND_REINDEX v10', () => {
    expect(
      reducer([{id: 0, idx: 0, src: "0"},{id: 1, idx: 1, src: "1"},{id: 2, idx: 2, src: "2"},{id: 3, idx: 3, src: "3"},{id: 6, idx: 6, src: "6"}], {
        type: types.REMOVE_IMAGE_AND_REINDEX,
        payload: {
          from: 0,
          to: 6
        }
      })
    ).toEqual([{id: 1, idx: 0, src: "1"},{id: 2, idx: 1, src: "2"},{id: 3, idx: 2, src: "3"},{id: 6, idx: 5, src: "6"}])
  })
  it('should handle REMOVE_IMAGE_AND_REINDEX v11', () => {
    expect(
      reducer([{id: 0, idx: 0, src: "0"},{id: 1, idx: 1, src: "1"},{id: 2, idx: 2, src: "2"},{id: 3, idx: 3, src: "3"}], {
        type: types.REMOVE_IMAGE_AND_REINDEX,
        payload: {
          from: 0,
          to: 2
        }
      })
    ).toEqual([{id: 1, idx: 0, src: "1"},{id: 2, idx: 1, src: "2"},{id: 3, idx: 3, src: "3"}])
  })




  it('should handle ADD_IMAGE', () => {
    expect(
      reducer([{id: 0, idx: 0, src: "0"}], {
        type: types.ADD_IMAGE,
        payload: {
          visual: {id: 1, idx: 1, src: "1"},
          reIndex: true
        }
      })
    ).toEqual([{id: 0, idx: 0, src: "0"},{id: 1, idx: 1, src: "1"}])
  })

  it('should handle ADD_IMAGE v2', () => {
    expect(
      reducer([{id: 0, idx: 0, src: "0"},{id: 2, idx: 1, src: "2"}], {
        type: types.ADD_IMAGE,
        payload: {
          visual: {id: 1, idx: 1, src: "1"},
          reIndex: true
        }
      })
    ).toEqual([{id: 0, idx: 0, src: "0"},{id: 1, idx: 1, src: "1"},{id: 2, idx: 2, src: "2"}])
  })




  it('should handle REMOVE_IMAGE at beginning', () => {
    expect(
      reducer(initialReorderState, {
        type: types.REMOVE_IMAGE,
        payload: 0
      })
    ).toEqual([{id: 1, idx: 1, src: "1"},{id: 2, idx: 2, src: "2"},{id: 3, idx: 3, src: "3"},{id: 4, idx: 4, src: "4"}])
  })
  it('should handle REMOVE_IMAGE at middle', () => {
    expect(
      reducer(initialReorderState, {
        type: types.REMOVE_IMAGE,
        payload: 1
      })
    ).toEqual([{id: 0, idx: 0, src: "0"},{id: 2, idx: 2, src: "2"},{id: 3, idx: 3, src: "3"},{id: 4, idx: 4, src: "4"}])
  })
  it('should handle REMOVE_IMAGE at end', () => {
    expect(
      reducer(initialReorderState, {
        type: types.REMOVE_IMAGE,
        payload: 4
      })
    ).toEqual([{id: 0, idx: 0, src: "0"},{id: 1, idx: 1, src: "1"},{id: 2, idx: 2, src: "2"},{id: 3, idx: 3, src: "3"}])
  })





  it('should handle REINDEX_IMAGES at beginning', () => {
    expect(
      reducer(initialReorderState, {
        type: types.REINDEX_IMAGES,
        payload: 0
      })
    ).toEqual([{id: 0, idx: 1, src: "0"},{id: 1, idx: 2, src: "1"},{id: 2, idx: 3, src: "2"},{id: 3, idx: 4, src: "3"},{id: 4, idx: 5, src: "4"}])
  })
  it('should handle REINDEX_IMAGES at middle', () => {
    expect(
      reducer(initialReorderState, {
        type: types.REINDEX_IMAGES,
        payload: 1
      })
    ).toEqual([{id: 0, idx: 0, src: "0"},{id: 1, idx: 2, src: "1"},{id: 2, idx: 3, src: "2"},{id: 3, idx: 4, src: "3"},{id: 4, idx: 5, src: "4"}])
  })
  it('should handle REINDEX_IMAGES before end', () => {
    expect(
      reducer(initialReorderState, {
        type: types.REINDEX_IMAGES,
        payload: 4
      })
    ).toEqual([{id: 0, idx: 0, src: "0"}, {id: 1, idx: 1, src: "1"},{id: 2, idx: 2, src: "2"},{id: 3, idx: 3, src: "3"},{id: 4, idx: 5, src: "4"}])
  })
  it('should handle REINDEX_IMAGES at end', () => {
    expect(
      reducer(initialReorderState, {
        type: types.REINDEX_IMAGES,
        payload: 5
      })
    ).toEqual([{id: 0, idx: 0, src: "0"}, {id: 1, idx: 1, src: "1"},{id: 2, idx: 2, src: "2"},{id: 3, idx: 3, src: "3"},{id: 4, idx: 4, src: "4"}])
  })
  it('should handle REINDEX_IMAGES', () => {
    expect(
      reducer([{id: 0, idx: 0, src: "0"},{id: 1, idx: 1, src: "1"}], {
        type: types.REINDEX_IMAGES,
        payload: 0
      })
    ).toEqual([{id: 0, idx: 1, src: "0"},{id: 1, idx: 2, src: "1"}])
  })
  */
})
