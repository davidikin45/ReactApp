import {all, takeEvery, takeLatest, put} from 'redux-saga/effects';
import api from '../../../api';

import actionTypes from '../actionTypes';
import * as actions from '../actions';

export function* purchaseBurgerSaga(action){
    yield put(actions.purchaseBurgerStart());
    try {
        var data = yield api.saveOrder(action.orderData, action.token);
        yield put(actions.purchaseBurgerSuccess(data.name, action.orderData));
    }
    catch(err)
    {
       yield put(actions.purchaseBurgerFail(err)); 
   }
}    

export function* fetchOrdersSaga(action){
    yield put(actions.fetchOrdersStart());
    try {
        var orders = yield api.getOrders(action.token, action.userId);
        const fetchedOrders=[];
        for (let key in orders)
        {
            fetchedOrders.push({
                ...orders[key],
             id: key
            });
        }
        yield put(actions.fetchOrdersSuccess(fetchedOrders));
    }
    catch(err)
    {
        yield put(actions.fetchOrdersFail(err)); 
    }
}

export function* watchOrderSaga(){
    yield all([
        takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga),
        takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga)
	]);
}