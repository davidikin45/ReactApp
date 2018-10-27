import actionTypes from '../actionTypes';
import apiAuth from '../../../apiAuth';

//sync
export const authStart = () =>{
    return {
        type: actionTypes.AUTH_START
    }
};


//async
export const auth = (email, password, isSignUp) =>{
    return async dispatch =>{
        dispatch(authStart());
         try {
             let data = null;
             if(isSignUp)
             {
                data = await apiAuth.signup(email, password);
             }
             else
             {
                data = await apiAuth.signin(email, password);
             }
             console.log(data);
             const expirationDate =  new Date(new Date().getTime() + data.expiresIn * 1000);
             localStorage.setItem('token', data.idToken);
             localStorage.setItem('userId', data.localId);
             localStorage.setItem('expirationDate', expirationDate);
             dispatch(authSuccess(data.idToken, data.localId));
             dispatch(checkAuthTimeout(data.expiresIn));
         }
         catch(err)
         {
            console.log(err);
            dispatch(authFail(err.response.data.error));
        }
    }
};

export const logout = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

//async
export const checkAuthTimeout = (expirationTime) =>{
    return async dispatch => {
        setTimeout(()=>{
            dispatch(logout());
        }, expirationTime * 1000);
    }
};

//sync
export const authSuccess = (token, userId) =>{
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
};

//sync
export const authFail = (error) =>{
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
};

//sync
export const setAuthRedirectPath = (path) =>{
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
};

//sync
export const authCheckState = () =>{
    return async dispatch =>{
        const token = localStorage.getItem('token');
        if(!token)
        {
            dispatch(logout());
        }
        else{
            const expirationTime = new Date(localStorage.getItem('expirationDate'));
            if(expirationTime > new Date())
            {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationTime.getTime() -  new Date().getTime()) /1000));
            }
            else
            {
                dispatch(logout());
            }
        }        
    }
};

