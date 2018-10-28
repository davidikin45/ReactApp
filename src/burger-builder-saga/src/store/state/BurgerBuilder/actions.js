import actionTypes from '../actionTypes';

export const addIngredient = (name) =>{
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
};

export const removeIngredient = (name) =>{
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
};

//async
export const initIngredients = () =>{
    return {
        type: actionTypes.INIT_INGREDIENTS
    }
    // return async dispatch =>{
    //      try {
    //          var data = await api.getIngredients();
    //          dispatch(setIngredients(data));
    //      }
    //      catch(err)
    //      {
    //         dispatch(fetchIngredientsFailed());
    //     }
    // }
};

//sync
export const setIngredients = (ingredients) =>{
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
};

export const fetchIngredientsFailed = () =>{
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
};