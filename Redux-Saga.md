# Getting Started with Redux Saga

## What is a Saga
* A long-running background process
* Responsible for application side effects
* Used with ES6 yield generator functions
* Controlled by the Redux Saga process manager
* List for actions, dispatch other actions using effects

## Promise key points
* a promise is similar to a task in .NET

## Yield key points
* yield only works in generator functions
* less lines of code and indentation

## Generator functions
* function* functionName(){}
* must call .next() to get result
* each time next() is called it will run up to the next yield line.
* a generator is similar to a .NET IEnumerable yield function
```
function* getValue(a, b)
{
    const value a + b;
    return a + b;
}
let gen = getValue(1,2);
let data = gen.next().value;
```

## Redux Saga Generator key points
* Without redux need wrapper code to capture response from API
```
function* getData()
{
    let data = yeild api.call('/cart');
    return data + 5;
}

let gen = getData();
let promise = gen.next();
promise.then(data => {
    let value = gen.next(data);
})
```
* Sagas are automatically wrapped by redux-saga
* They behave very similar to async/await tasks in .NET
```
function* mySaga()
{
    yield delay(500);
    yield delay(700);
    console.log("Saga complete");
}
```
## Redux Saga Effects
* Thread Management Effects = call, fork, spawn, apply
* Action creation = put
* Data seeding = select
* Flow control = take, takeEvery, takeLatest

### Take
* Pauses execution of code and waits for an action to be dispatched
```
yield take("ACTION_NAME");
```

### Put
* Dispatches an action
* Same as calling dispatch in redux-thunk
* Useful for passing data to another saga in combination with Take
```
yield put("ACTION_NAME", value: 42);
```
### Call
* Just like calling a method directly
* Used for testing
```
let fn = () => {console.log("Called")}
yield call(fn);
```

### Fork
* Like call but caller continues without pausing execution
```
let fn = () => {console.log("Called")}
yield fork(fn);
```

### Spawn
* Like fork but is not a child process of the caller
* If caller errors or itself is called the spawned process is not affected.
```
let fn = () => {console.log("Called")}
yield spawn(fn);
```

### TakeEvery
* Combination on Take and Fork
* Each time action is dispatched it forks
```
yield takeEvery("ACTION_NAME");
```

### Cancel
* Stops a forked process at most recent yield
* Invokes finally on forked process
```
function* saga(){
    let forked = yield effects.fork(process);
    yield delay(5000);
    yield cancel(forked)l
    console.info("DONE!");
}
```

### Cancelled
* return true if callee process has been cancelled by caller
* Used in finally block to determine if cancellation is cause of termination
```
function* process(){
    try{
        while(true)
        {
            console.log("Looped");
            yield delay(500);
        }
    } finally{
        const canncelled = yield cancelled();
        console.info("Cancelled?", cancelled);
    }
}
```
### TakeLatest
* Combination of Fork, TakeEvery and Cancel
* Forks child process each time action is dispatched, while keeping exactly one instance of the child process running.
```
takeLatest("EVENT_NAME", process);
```

### Select
* Returns a copy of the applications state

### All
* Combines a number of take actions
* Will only resume when all the actions have been dispatched.
* Order does not matter

## Redux Thunk vs Saga
| Thunk        | Saga                                                   |           
| ------------- |:-------------:                                        |
| Redux Middleware      | Redux Middleware                              |
| Created by Redux creator      | Created by third party developer      |
| Any JavaScript |     Only ES6 environments that support Yield         |
| No built-in async |     yield and generator simplify async            |
| No way to orchestrate side-effects between thunks |    Uses effects and plain actions to coordinate sagas |

## Redux Saga
* Dispatch functions using this.props.dispatch(function(dispatch){})
1. Install redux saga
```
npm install lodash keymirror
npm install redux react-redux redux-logger react-router-redux redux-saga redux-logger redux-devtools-extension --save
npm install redux-immutable-state-invariant --save-dev
```
2. Create the following directories
```
\store
\store\reducers
\store\actions
\sagas
```
3. Create a store\configureStore.js file and put in the following contents.
```
import {createStore, applyMiddleware} from 'redux';
import { createLogger } from 'redux-logger';

import createSagaMiddleware from 'redux-saga';
import {initSagas} from './sagas/initSagas';

import rootReducer from './reducers/index';

const apiUrl = 'http://localhost:4000/api';

const sagaMiddleware = createSagaMiddleware();
const middleware = [
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
          module.hot.accept('./reducers/index', () => {
              console.log('HMR Reducers');
              store.replaceReducer(rootReducer);
          });
      }

    initSagas(sagaMiddleware);
    return store;
}
```
4. Create a sagas\initSagas.js and put in the following contents.
```
import * as sagas from './sagas';

export const initSagas = (sagaMiddleware) => {
    Object.values(sagas).forEach(sagaMiddleware.run.bind(sagaMiddleware));
}
```
5. Example sagas\createUserSaga.js
```
import {delay} from 'redux-saga';

export function* currentUserSaga(){
    while(true)
    {
        yield delay(1000);
        console.info('User saga loop');
    }
}
```
6. Create a sagas\index.js file and put in the following contents.
```
export{ currentUserSaga } from './createUserSaga'
```
4. Example action\speakers.js.
The event payloads are stored in a seperate file.
```
import axios from 'axios';
import debounce from 'lodash.debounce';

export const SPEAKER_LOAD = 'SPEAKER_LOAD';
export const SPEAKER_LOAD_SUCCESS = 'SPEAKER_LOAD_SUCCESS';
export const SPEAKER_LOAD_FAIL = 'SPEAKER_LOAD_FAIL';

export function speakersFetchData() {
    return {
        type: SPEAKER_LOAD,
        payload: {
            request:{
                url:'/data/speakers.json'
            } 
        }
    }
}

export function fetchConversionRate(payload)
{
    return (dispatch) => {
        makeConversionAjaxCall(payload, dispatch);
    };
}

function _makeConversionAjaxCall(payload, dispatch)
{
    dispatch({type:"REQUEST_CONVERSION_RATE", data: payload});

            // ajax call for destination amount
        // originCurrency, destCurrency, originAmount
        axios.get('/api/conversion', {
            params: payload
        })
        .then((resp) => {
            dispatch({type:"RECEIVED_CONVERSION_RATE_SUCCESS", data: resp.data});
        })
        .catch((err)=>{
            dispatch({type:"RECEIVED_CONVERSION_RATE_FAILURE", data: err});
        });
}

//debounce waits a specified period before sending request
var makeConversionAjaxCall = debounce(_makeConversionAjaxCall, 300);
```
5. It is often a good idea to extract the action constants into another file named actionTypes.js
```
import keyMirror from 'keymirror';

export var ActionTypes = keyMirror({
    CHANGE_ORIGIN_AMOUNT: null
})
```
They can then be imported and used in the reducer and actions file using the following:
```
import { ActionTypes as types } from './actionTypes';
types.CHANGE_ORIGIN_AMOUNT
```
6. Example reducers\speakers.js
```
import {SPEAKER_LOAD, SPEAKER_LOAD_FAIL, SPEAKER_LOAD_SUCCESS} from "../actions/speakers";

var defaultState = {
    data: [],
    isLoading: true,
    hasErrored: false,
    errorMessage: ""
};

export function speakers(state = defaultState, action) {
    switch (action.type) {

        case SPEAKER_LOAD: {
            return Object.assign({}, state, {
                isLoading: true,
                hasErrored: false
            });
        }

        case SPEAKER_LOAD_SUCCESS: {
            return Object.assign({}, state, {
                data: action.payload.data,
                isLoading: false,
                hasErrored: false
            });
        }

        case SPEAKER_LOAD_FAIL: {
            return Object.assign({}, state, {
                isLoading: false,
                hasErrored: true,
                errorMessage: action.error.message
            });
        }

        default:
            return state;
    }
}
```
7. Create a reducers\index.js file and put in the following contents. React expects one reducer.
```
import { combineReducers } from 'redux';
import { speakers } from './speakers';

export default combineReducers({
    speakers : speakers
})
```
8. update index.js to include the Provider element
```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import configureStore from "./redux/configureStore";
const store = configureStore(window.__STATE__);

const render = () => {
    return ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('root')
    );
  };

  render();

//HMR
//https://medium.com/@brianhan/hot-reloading-cra-without-eject-b54af352c642
//https://duske.me/setting-up-hot-module-replacement-with-create-react-app-and-redux/
if (module.hot && process.env.NODE_ENV !== 'production') {
    module.hot.accept('./App', () => {
        console.log('HMR App');
        render();
      });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
```
9. Dispatching action in a component
```
import React, {Component} from 'react';

import SpeakersHeader from './SpeakersHeader';
import SpeakerList from './SpeakerList';

import { connect } from 'react-redux';
import { speakersFetchData } from "../../redux/actions/speakers"

class SpeakersRedux extends Component {
    state = {
        isLoading: true,
        appData: []
    };

    componentDidMount() {
        this.props.speakersFetchData();
    }

    render() {
        if (this.props.isLoading) {
             return <span><i>Loading...</i></span>
         }
         else if (this.props.hasErrored) {
            return <span><b>Failed to load data:{this.props.errorMessage}</b></span>
        }
         else {
            return (
                <div>
                    <SpeakersHeader/>
                    <SpeakerList speakers={this.props.speakers} />
                     {/*<span>{JSON.stringify(this.state.appData)}</span>*/}
                 </div>
             );
         }
    }
} 

const mapStateToProps = (state) => {
    return{
        speakers: state.speakers.data,
        hasErrored: state.speakers.hasErrored,
        isLoading: state.speakers.isLoading,
        errorMessage: state.speakers.errorMessage
    };
};

export default connect(mapStateToProps,{speakersFetchData})(SpeakersRedux)
```
10. Important once user using the combineReducers functionality the reducer must be specified in the mapStateToProps function.
```
export default connect((state, props) => {
    return {
        originAmount: state.amount.originAmount,
        destinationAmount: state.amount.destinationAmount,
        conversionRate: state.amount.conversionRate,
        feeAmount: state.amount.feeAmount,
        totalCost : state.amount.totalCost
    }
})(Conversion);
```
11. Install [Redux Dev Tools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) 

## PluralSight Courses
* [Redux Saga](https://app.pluralsight.com/library/courses/redux-saga/table-of-contents)

## Authors

* **David Ikin**