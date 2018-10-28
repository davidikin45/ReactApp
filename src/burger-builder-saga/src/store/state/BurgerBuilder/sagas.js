import {all, takeEvery, put} from 'redux-saga/effects';
import api from '../../../api';

import actionTypes from '../actionTypes';
import * as actions from '../actions';

export function* initIngredientsSaga(action){
    try {
        var data = yield api.getIngredients();
        yield put(actions.setIngredients(data));
    }
    catch(err)
    {
       yield put(actions.fetchIngredientsFailed());
   }
}    

export function* watchBurgerBuilderSaga(){
    yield all([
        takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga)
	]);
}