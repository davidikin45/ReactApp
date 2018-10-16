import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import { composeWithDevTools } from 'redux-devtools-extension';

const production = true;

const apiUrl = 'http://localhost:4000/api';

let middleware = [
    thunk,
    axiosMiddleware(axios.create({baseURL:apiUrl}))
];

if (!production) {
    middleware.push(require('redux-immutable-state-invariant').default());
    console.log('added redux-immutable-state-invariant');
}

export default function configureStore(initialState = {}) {

    const composeEnhancers = composeWithDevTools({
        // Specify name here, actionsBlacklist, actionsCreators and other options if needed
    });

    return createStore(
        reducers,
        initialState,
         composeEnhancers(
            applyMiddleware(...middleware))
    );
}