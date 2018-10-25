import actionTypes from '../actionTypes';
import api from '../../../api';

//sync
export const purchaseBurgerStart = () =>{
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
};

//sync
export const purchaseBurgerSuccess = (id, orderData) =>{
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
};

//sync
export const purchaseBurgerFail = (error) =>{
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
};

//async
export const purchaseBurger = (orderData) =>{
    return async dispatch =>{
         dispatch(purchaseBurgerStart());
         try {
             var data = await api.saveOrder(orderData);
             dispatch(purchaseBurgerSuccess(data.name, orderData));
         }
         catch(err)
         {
            dispatch(purchaseBurgerFail(err)); 
        }
    }
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
};

//sync
export const fetchOrdersStart = () =>{
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
};

//sync
export const fetchOrdersSuccess = (orders) =>{
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
};

//sync
export const fetchOrdersFail = (error) =>{
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
};

//async
export const fetchOrders = () =>{
    return async dispatch =>{
         dispatch(fetchOrdersStart());
         try {
             var orders = await api.getOrders();
             const fetchedOrders=[];
             for (let key in orders)
             {
                 fetchedOrders.push({
                     ...orders[key],
                     id: key
                 });
             }
             dispatch(fetchOrdersSuccess(fetchedOrders));
         }
         catch(err)
         {
            dispatch(fetchOrdersFail(err)); 
        }
    }
};