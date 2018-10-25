
import { ActionTypes as types } from '../actions/actionTypes';

var defaultState = {
    originCurrency: 'AUD',
    destinationCurrency:'EUR',
    originAmount: '0.00',
    destinationAmount: '0.00',
    conversionRate: 1.5,
    feeAmount: 0.00,
    totalCost: 0.00
};

function amount(state = defaultState, action){
    switch(action.type)
    {
        case(types.CHANGE_ORIGIN_AMOUNT):
            return {
                ...state,
                originAmount: action.data.newAmount
            };
        case(types.CHANGE_DESTINATION_AMOUNT):
            return {
                ...state,
                destinationAmount: action.data.newAmount
            };
        case(types.CHANGE_ORIGIN_CURRENCY):
            return {
                ...state,
                originCurrency: action.data.newCurrency
            };
        case(types.CHANGE_DESTINATION_CURRENCY):
            return {
                ...state,
                destinationCurrency: action.data.newCurrency
            };
        case(types.RECEIVED_CONVERSION_RATE_SUCCESS):
            return {
                ...state,
                conversionRate: action.data.xRate,
                originAmount:action.data.originAmount,
                destinationAmount: action.data.destAmount
            };
        case(types.RECEIVED_FEES_SUCCESS):
            var newFeeAmount = action.data.feeAmount;
            var newTotal = parseFloat(state.originAmount, 10) + parseFloat(newFeeAmount, 10);
            //immutable - new object, copy old state and update
            return {
                ...state,
                feeAmount: newFeeAmount,
                totalCost: newTotal
            };
        default:
         return state;
    }
}

export default amount;