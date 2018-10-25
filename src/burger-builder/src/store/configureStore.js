import {createStore, applyMiddleware, compose} from 'redux';
import { createLogger } from 'redux-logger';

import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './combineReducers'
import {initSagas} from './initSagas';

const sagaMiddleware = createSagaMiddleware();

const middleware = [
    thunk,
    sagaMiddleware
];

const enhancers = [];

if (process.env.NODE_ENV === 'development') {
    console.log('Running in Development Mode');
    
    const immutableState = require('redux-immutable-state-invariant').default();
    middleware.push(immutableState);

    //logger must be last
    const logger = createLogger({collapsed: true});
    middleware.push(logger);

    //redux dev tools
    if (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) {
        const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__();
        enhancers.push(devToolsExtension);
    }
}

export default function configureStore(initialState = {}) {
    const store = createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware), ...enhancers)
    );

      //HMR
      if (module.hot && process.env.NODE_ENV !== 'production') {
          console.log('HMR enabled for reducers');
          module.hot.accept('./combineReducers', () => {
              console.log('HMR Reducers');
              store.replaceReducer(rootReducer);
          });
      }

    initSagas(sagaMiddleware);
    return store;
}