import { takeEvery, put, call, select } from 'redux-saga/effects';
import { setFormErrors } from '../store/form';
import {
  ADD_STEP_REQUEST,
  ADD_STEP_REQUEST__SUCCESS,
  ADD_STEP_REQUEST__FAILURE,
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

function* createStepSaga({payload}){
  try {
    let { step } = yield select(getFormValues);
    let errors = validateStepValues(step.values);
    if(!errors){
      if(step.values.image){
        const image = yield call(readAsDataURL, step.values.image)
        step.values.src = image;
      }
      yield put({type: ADD_STEP_REQUEST__SUCCESS, payload: {step: step.values}})
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
    console.log("HELLO");
    let { procedure } = yield select(getFormValues);
    let errors = validateProcedureValues(procedure.values);
    if(!errors){
      let procedureHasSteps = yield select(checkIfProcedureHasSteps);
      if(procedureHasSteps){
        alert('PROCEDURE CREATED')
      }
    } else {
      yield put(setFormErrors({form: 'procedure', inputErrors: errors}))
    }
  } catch (e) {
    console.log("ERROR", e);
  }
}
export default function* procedureSagas() {
  yield takeEvery(ADD_STEP_REQUEST, createStepSaga);
  yield takeEvery(CREATE_PROCEDURE_REQUEST, createProcedureSaga);
}
