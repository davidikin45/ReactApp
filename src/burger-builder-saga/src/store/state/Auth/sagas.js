import {delay} from 'redux-saga';
import {all, takeEvery, put, call} from 'redux-saga/effects';
import apiAuth from '../../../apiAuth';

import actionTypes from '../actionTypes';
import * as actions from '../actions';

export function* logoutWorkerSaga(action){
    yield call([localStorage,'removeItem'], 'token');
    yield call([localStorage,'removeItem'], 'expirationDate');
    yield call([localStorage,'removeItem'], 'userId');
    yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action){
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());
}

export function* authUserSaga(action){
    yield put(actions.authStart());
    try {
        let data = null;
        if (action.isSignup)
        {
           data = yield apiAuth.signup(action.email, action.password);
        }
        else
        {
           data = yield apiAuth.signin(action.email, action.password);
        }
        const expirationDate =  yield new Date(new Date().getTime() + data.expiresIn * 1000);
        yield localStorage.setItem('token', data.idToken);
        yield localStorage.setItem('userId', data.localId);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield put(actions.authSuccess(data.idToken, data.localId));
        yield put(actions.checkAuthTimeout(data.expiresIn));
    }
    catch(err)
    {
       yield put(actions.authFail(err.response.data.error));
   }
}
export function* authCheckStateSaga(action){
    const token = yield localStorage.getItem('token');
    if(!token)
    {
        yield put(actions.logout());
    }
    else{
        const expirationTime = yield new Date(localStorage.getItem('expirationDate'));
        if(expirationTime > new Date())
        {
            const userId = yield localStorage.getItem('userId');
            put(actions.authSuccess(token, userId));
            put(actions.checkAuthTimeout((expirationTime.getTime() -  new Date().getTime()) /1000));
        }
        else
        {
            put(actions.logout());
        }
    }    
}    

export function* watchAuthSaga(){
    yield all([
        takeEvery(actionTypes.AUTH_INIT_LOGOUT, logoutWorkerSaga),
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
	]);
}