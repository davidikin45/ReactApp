import { applyMiddleware, createStore, compose  } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from '../store/reducers/index'

const middleware = [thunk];

if (process.env.NODE_ENV === 'development') {
    console.log('Running in Development Mode');

    const immutableState = require('redux-immutable-state-invariant').default();
    middleware.push(immutableState);

    //logger must be last.
    const logger = createLogger({collapsed: true});
    middleware.push(logger);
}

export default function configureStore(initialState = {}) {

    //func1(func2(func3(func4))))
    //compose allows compose(func1, func2, func3, func4)
    const composeEnhancers = composeWithDevTools({
        // Specify name here, actionsBlacklist, actionsCreators and other options if needed
    });

    return createStore(
        rootReducer,
        initialState,
         composeEnhancers(
            applyMiddleware(...middleware))
    );
}