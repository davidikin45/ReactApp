import { createStore } from 'redux';

var defaultState = {
    originAmount: '0.00'
};

function amount(state = defaultState, action){
    if(action.type === 'CHANGE_ORIGIN_AMOUNT')
    {
        //immutable - new object, copy old state and update
        //=== to see if you are referring to the same object
     
        var newState = Object.assign({}, state, {originAmount: action.data});
        console.log('same?', state === newState);
        return newState;
    }

    if(action.type === 'CHANGE_ORIGIN_AMOUNT2')
    {
        //immutable - new object, copy old state and update
        //=== to see if you are referring to the same object
     
        //object spread
        return {
            ...state,
            originAmount: action.data
        };
    }
    
    return state;
}

var store = createStore(amount);

export default store;