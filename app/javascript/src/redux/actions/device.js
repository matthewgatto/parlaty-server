import * as types from '@types/device';

export const reorderDeviceAction = (from,to) => ({type: types.REORDER_DEVICE_ACTION, payload: {from, to}})
export const removeDeviceAction = (idx) => ({type: types.REMOVE_DEVICE_ACTION, payload: idx})
export const addDeviceAction = () => ({type: types.ADD_DEVICE_ACTION})
export const loadDeviceActions = (actions) => ({type: types.LOAD_DEVICE_ACTIONS, payload: actions});
