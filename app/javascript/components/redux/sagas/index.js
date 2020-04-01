import { takeEvery, all, fork } from 'redux-saga/effects';
import * as auth from './auth';
import * as oem from './oem';
import * as business from './business';
import * as procedure from './procedure';
import * as step from './step';
import * as device from './device';
import * as user from './user';
import * as authTypes from '@types/auth';
import * as oemTypes from '@types/oem';
import * as businessTypes from '@types/business';
import * as procedureTypes from '@types/procedure';
import * as stepTypes from '@types/step';
import * as deviceTypes from '@types/device';
import * as userTypes from '@types/user';

export default function* appSagas(){
  yield all([

    yield takeEvery(authTypes.CREATE_AUTH_REQUEST, auth.loginSaga),
    yield takeEvery(authTypes.CREATE_INVITE_CONFIRMATION_REQUEST, auth.inviteConfirmationSaga),
    yield takeEvery(authTypes.CREATE_PASSWORD_RESET_EMAIL_REQUEST, auth.passwordResetEmailSaga),
    yield takeEvery(authTypes.UPDATE_PASSWORD_REQUEST, auth.updatePasswordSaga),
    yield takeEvery(userTypes.CREATE_USER_REQUEST, user.inviteUserSaga),
    yield takeEvery(userTypes.UPDATE_USER_REQUEST, user.updateUserSaga),
    yield takeEvery(userTypes.DELETE_USER_REQUEST, user.deleteUserSaga),
    yield takeEvery(userTypes.FETCH_USERS_REQUEST, user.userListSaga),
    yield takeEvery(userTypes.FETCH_USER_REQUEST, user.fetchUserSaga),
    yield takeEvery(oemTypes.CREATE_OEM_REQUEST, oem.inviteOEMSaga),
    yield takeEvery(oemTypes.UPDATE_OEM_REQUEST, oem.updateOEMSaga),
    yield takeEvery(oemTypes.FETCH_OEMS_REQUEST, oem.oemListSaga),
    yield takeEvery(oemTypes.FETCH_OEM_BUSINESSES_REQUEST, oem.oemBusinessesSaga),
    yield takeEvery(businessTypes.FETCH_BUSINESS_PROCEDURES_REQUEST, business.businessProceduresSaga),
    //yield takeEvery(businessTypes.CREATE_BUSINESS_REQUEST, business.createBusinessSaga),
    yield takeEvery(procedureTypes.CREATE_PROCEDURE_REQUEST, procedure.createProcedureSaga),
    yield takeEvery(procedureTypes.UPDATE_PROCEDURE_REQUEST, procedure.updateProcedureSaga),
    yield takeEvery(procedureTypes.FETCH_PROCEDURE_REQUEST, procedure.fetchProcedureSaga),
    yield takeEvery(procedureTypes.DELETE_PROCEDURE_REQUEST, procedure.deleteProcedureSaga),
    yield takeEvery(procedureTypes.COPY_PROCEDURE_REQUEST, procedure.copyProcedureSaga),
    yield takeEvery(stepTypes.STEP_SAVE_REQUEST, step.stepSaveSaga),
    yield takeEvery(stepTypes.REORDER_STEP_REQUEST, step.reorderStepSaga),
    yield takeEvery(stepTypes.DELETE_STEP_REQUEST, step.deleteStepSaga),
    yield takeEvery(deviceTypes.FETCH_DEVICES_REQUEST, device.deviceListSaga),
    yield takeEvery(deviceTypes.DELETE_DEVICE_REQUEST, device.deleteDeviceSaga),
    yield fork(device.getFreshDeviceData),
    yield takeEvery(deviceTypes.CREATE_DEVICE_REQUEST, device.createDeviceSaga),
    yield takeEvery(deviceTypes.UPDATE_DEVICE_REQUEST, device.updateDeviceSaga),
    yield takeEvery(deviceTypes.CREATE_PROCEDURE_DEVICE_REQUEST, device.createProcedureDeviceSaga)
  ])
}
