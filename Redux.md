# Getting Started with Redux

![alt text](redux.jpg "Redux")

## Flux and [Redux](https://redux.js.org)
* Flux is an architectural pattern
* Redux is an implementation of the pattern
* For complex applications
* New concept around state and UI updates
* State stored outside of components
* Action > Dispatcher > Store  > View
* Immutability
* Makes state predictable

** You Might Not Need Redux(https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367)

## Immutability (Merge or Copy)
Clone and modify instead of mutating original
```
var history[];
var state = {color: 'red', name:'Adam', point:5}
var state2 = Object.assign({}, state, {point: 50})
history.push(state, state2);
```
```
var history[];
var state = {color: 'red', name:'Adam', point:5};
var state2 = {...state, point: 50};
history.push(state, state2);
```

## Redux Packages
* redux: main library (independent from React)
* react-redux: connects your redux store with ReactComponents (Takes care of subscribing to state changes that re-render component and child components)
* redux-thunk: a redux middleware which helps you with async actions

## Redux Only Example
1. Create new app and install redux
```
npm create-react-app my-app --use-npm
install redux
```
2. create a store/configureStore.js file and import from index.js
```
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

store.subscribe(function(){
    console.log('state', store.getState());
})

store.dispatch({type:'CHANGE_ORIGIN_AMOUNT', data: '300.65' });
store.dispatch({type:''});
store.dispatch({type:''});

export default store;
```

## React-Redux Example
* Dispatch actions using this.props.dispatch({type:"CHANGE_ORIGIN_AMOUNT", data:{}})
1. Create new app and install redux
```
npm create-react-app my-app --use-npm
install redux
install react-redux
```
2. create a store/configureStore.js file and import from index.js
```
import { createStore } from 'redux'; 

var defaultState = {
    originAmount: '0.00'
};

function amount(state = defaultState, action){
    if(action.type === 'CHANGE_ORIGIN_AMOUNT')
    {
        //immutable - new object, copy old state and update
         return {
            ...state,
            originAmount: action.data
        };
    }
	
    return state;
}

var store = createStore(amount);

export default store;
```
3. Within index.js wrap the App tag with a Provider and pass in the store.
```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import App from './App'
import store from'./store/configureStore';

ReactDOM.render(<Provider store={store}>
                    <App />
                </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
```
4. Connect the container component to redux by using the connect import
```
import React, { Component } from 'react';
import { connect } from 'react-redux';
 
class UpdateScore extends Component {
    state = {  }
    render() { 
        return (<div></div>);
    }
}
 
export default connect((state, props) =>{
    console.log('connect state', state);
    console.log('connect props', props);

    //return new props
    return {
        originAmount: state.originAmount
    }
})(UpdateScore);
```
5. It is convention to put connected componentents in a containers folder and non connected components in the components folder

## Redux Thunk
1. Install axios and redux thunk
```
npm install axios
npm install redux react-redux redux-axios-middleware react-router-redux redux-thunk redux-devtools-extension --save
npm install redux-immutable-state-invariant --save-dev
```
2. Create the following directories
```
\redux
\redux\reducers
\redux\actions
```
3. Create a redux\configureStore.js file and put in the following contents.
```
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
```
4. Example action\speakers.js
```
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
```
5. Example reducers\speakers.js
```
import {SPEAKER_LOAD, SPEAKER_LOAD_FAIL, SPEAKER_LOAD_SUCCESS} from "../actions/speakers";

export function speakers(state = {
    data: [],
    isLoading: true,
    hasErrored: false,
    errorMessage: ""
}, action) {
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
6. Create a reducers\index.js file and put in the following contents.
```
import { combineReducers } from 'redux';
import {speakers} from './speakers';

export default combineReducers({
    speakers
})
```
7. update index.js to include the Provider element
```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import configureStore from "./redux/configureStore";
const store = configureStore(window.__STATE__);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
```
8. Dispatching action in a component
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
9. Install [Redux Dev Tools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) 

## PluralSight Courses
* [Redux Fundamental](https://app.pluralsight.com/library/courses/redux-fundamentals/table-of-contents)
* [Building a Website with React and ASP.NET Core](https://www.pluralsight.com/courses/aspdotnet-core-react-building-website)

## Authors

* **David Ikin**