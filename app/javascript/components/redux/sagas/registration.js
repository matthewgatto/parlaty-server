import {call, put} from 'redux-saga/effects';
import { normalize } from 'normalizr';
import API from '@utils/API';
import {postSaga, pushAndNotify, goToSuccessPage} from './form';
import Schemas from '@utils/models';
import {push} from "connected-react-router";
import { addToast } from '@actions/toast';

function* handleActionSuccess(response, messages){
    yield call(response.role === "ClientAdmin" ? goToSuccessPage(messages.operator) : pushAndNotify("/", messages.user))
}

const makeAuthState = (user) => {
    const normalizedData = normalize(user, Schemas.user);
    const initialState = {auth: normalizedData.entities.users[normalizedData.result]}
    if(user.roleable_type === "Operator" || user.roleable_type === "Author"){
        initialState.oem_businesses = normalizedData.entities.oem_businesses
    } else if(user.roleable_type === "ClientAdmin"){
        initialState.oem_businesses = normalizedData.entities.oem_businesses
        initialState.oems = normalizedData.entities.oems
        initialState.oem = user.oem

    }
    return initialState
}

function handleRegistrationResponse(auth){
    const initialState = makeAuthState(auth);
    localStorage.setItem('login_data_4_16', JSON.stringify({jwt: initialState.auth.jwt, id: initialState.auth.id, roleable: initialState.auth.roleable}));
    API.setToken(auth.jwt);
    return initialState;
}

const p = (i,x) => ({[i]:x})
export function* registrationSaga(action){
    action.payload.values.web_request = true;
    yield call(postSaga, action, handleRegistrationResponse);
    yield put(push("/"))
    yield put(addToast("success", "Registration successful"))
}

export function* selfDataSaga(action){
    try {
        const response = yield call(API.get, action.payload.url);
        const payload = makeAuthState(response)
        yield put({
            type: `CREATE_REGISTRATION_REQUEST__SUCCESS`,
            payload
        })
    } catch (e) {

    }
}
