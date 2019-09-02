import { takeEvery, put, call, select } from 'redux-saga/effects';
import { setFormErrors } from '../store/form';
import {
  SAVE_STEP_REQUEST,
  ADD_STEP_REQUEST__SUCCESS,
  EDIT_STEP_REQUEST__SUCCESS,
  SAVE_STEP_REQUEST__FAILURE,
  CREATE_PROCEDURE_REQUEST,
  CREATE_PROCEDURE_REQUEST__SUCCESS,
  CREATE_PROCEDURE_REQUEST__FAILURE
} from '../store/procedure';

const getFormValues = ({form}) => form
const checkIfProcedureHasSteps = ({procedure}) => procedure.steps.length ? true : false;

function readAsDataURL(blob) {
  return new Promise((resolve, reject) => {
    const reader  = new FileReader();
    reader.onload = (e) => resolve(e.target.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

function validateStepValues({title, location, parameter}){
  let errors = {}
  if(!title || !title.length){
    errors.title = true;
  }
  if(!location || !location.length){
    errors.location = true;
  }
  if(!parameter || !parameter.length){
    errors.parameter = true;
  }
  return Object.keys(errors).length > 0 ? errors : null
}

function* createStepSaga(step){
  if(step.image){
    const image = yield call(readAsDataURL, step.image)
    step.src = image;
  }
  step.id = Date.now();
  yield put({type: ADD_STEP_REQUEST__SUCCESS, payload: {step}})
}

function getUpdatedProperties(newObj = {}, initialObj = {}){
  let updates = {}
  for (var field in newObj) {
    if (newObj.hasOwnProperty(field) && newObj[field] !== initialObj[field]){
        updates[field] = newObj[field]
    }
  }
  return Object.keys(updates).length > 0 ? updates : false;
}

function* editStepSaga({values, initialValues}){
  let updatedProperties = yield call(getUpdatedProperties, values, initialValues);
  let updatedStep;
  if(updatedProperties.image){
    const image = yield call(readAsDataURL, updatedProperties.image)
    updatedStep = {...initialValues, ...updatedProperties, src: image}
  } else if(updatedProperties.image === null) {
    let { image: img1, src: src1, ...restOfUpdatedProperties } = updatedProperties;
    let { image: img2, src: src2, ...restOfInitialValues } = initialValues;
    updatedStep = {...restOfInitialValues, ...restOfUpdatedProperties}
  } else {
    updatedStep = {...initialValues, ...updatedProperties}
  }
  yield put({type: EDIT_STEP_REQUEST__SUCCESS, payload: updatedStep})
}

function* saveStepSaga({payload}){
  try {
    let { step, type } = yield select(getFormValues);
    let errors = validateStepValues(step.values);
    if(!errors){
      if(type === "create"){
        yield call(createStepSaga, step.values)
      } else {
        yield call(editStepSaga, step)
      }
    } else {
      yield put(setFormErrors({form: 'step', inputErrors: errors}))
    }
  } catch (e) {
    console.log("ERROR", e);
  }
}

function validateProcedureValues({title, description}){
  let errors = {}
  if(!title || !title.length){
    errors.title = true;
  }
  if(!description || !description.length){
    errors.description = true;
  }
  return Object.keys(errors).length > 0 ? errors : null
}

function* createProcedureSaga({payload}){
  try {
    let { procedure } = yield select(getFormValues);
    let errors = validateProcedureValues(procedure.values);
    if(!errors){
      let procedureHasSteps = yield select(checkIfProcedureHasSteps);
      if(procedureHasSteps){
        alert('PROCEDURE CREATED - APP WILL RELOAD');
        location.reload();
      }
    } else {
      yield put(setFormErrors({form: 'procedure', inputErrors: errors}))
    }
  } catch (e) {
    console.log("ERROR", e);
  }
}
export default function* procedureSagas() {
  yield takeEvery(SAVE_STEP_REQUEST, saveStepSaga);
  yield takeEvery(CREATE_PROCEDURE_REQUEST, createProcedureSaga);
}
