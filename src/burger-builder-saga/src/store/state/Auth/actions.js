import actionTypes from '../actionTypes';

//sync
export const authStart = () =>{
    return {
        type: actionTypes.AUTH_START
    }
};


//sync
export const auth = (email, password, isSignup) =>{
    return {
        type: actionTypes.AUTH_USER,
        email: email,
        password: password,
        isSignup : isSignup
    }
    // return async dispatch =>{
    //     dispatch(authStart());
    //      try {
    //          let data = null;
    //          if(isSignup)
    //          {
    //             data = await apiAuth.signup(email, password);
    //          }
    //          else
    //          {
    //             data = await apiAuth.signin(email, password);
    //          }
    //          console.log(data);
    //          const expirationDate =  new Date(new Date().getTime() + data.expiresIn * 1000);
    //          localStorage.setItem('token', data.idToken);
    //          localStorage.setItem('userId', data.localId);
    //          localStorage.setItem('expirationDate', expirationDate);
    //          dispatch(authSuccess(data.idToken, data.localId));
    //          dispatch(checkAuthTimeout(data.expiresIn));
    //      }
    //      catch(err)
    //      {
    //         console.log(err);
    //         dispatch(authFail(err.response.data.error));
    //     }
    // }
};

export const logout = () =>{
    // localStorage.removeItem('token');
    // localStorage.removeItem('expirationDate');
    // localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_INIT_LOGOUT
    };
};

export const logoutSucceed = () =>{
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) =>{
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime: expirationTime
    };
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
    return {
        type: actionTypes.AUTH_CHECK_STATE
    };
    // return async dispatch =>{
    //     const token = localStorage.getItem('token');
    //     if(!token)
    //     {
    //         dispatch(logout());
    //     }
    //     else{
    //         const expirationTime = new Date(localStorage.getItem('expirationDate'));
    //         if(expirationTime > new Date())
    //         {
    //             const userId = localStorage.getItem('userId');
    //             dispatch(authSuccess(token, userId));
    //             dispatch(checkAuthTimeout((expirationTime.getTime() -  new Date().getTime()) /1000));
    //         }
    //         else
    //         {
    //             dispatch(logout());
    //         }
    //     }        
    // }
};

