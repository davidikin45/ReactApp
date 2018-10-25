import { applyMiddleware, createStore, compose  } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './reducers/index'

const middleware = [thunk];
const enhancers = [];

if (process.env.NODE_ENV === 'development') {
    console.log('Running in Development Mode');

    const immutableState = require('redux-immutable-state-invariant').default();
    middleware.push(immutableState);

    //logger must be last.
    const logger = createLogger({collapsed: true});
    middleware.push(logger);

    //chrome redux dev tools
    if (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) {
        const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__();
        enhancers.push(devToolsExtension);
    }
}

export default function configureStore(initialState = {}) {

    //func1(func2(func3(func4))))
    //compose allows compose(func1, func2, func3, func4)

    const store = createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware), ...enhancers)
    );

      //HMR
      if (module.hot && process.env.NODE_ENV !== 'production') {
          module.hot.accept('./reducers/index', () => {
              console.log('HMR Reducers');
              store.replaceReducer(rootReducer);
          });
      }    

    return store;
}