import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import configureStore from "./store/configureStore";
const store = configureStore({});

const app = (
    <Provider store={store}>
        <BrowserRouter basename="/">
            <App />
        </BrowserRouter>
    </Provider>);

const render = () => {
    return ReactDOM.render(app, document.getElementById('root')
    );
  };

  render();

//HMR
//https://medium.com/@brianhan/hot-reloading-cra-without-eject-b54af352c642
//https://duske.me/setting-up-hot-module-replacement-with-create-react-app-and-redux/
if (module.hot && process.env.NODE_ENV !== 'production') {
    console.log('HMR enabled for components');
    module.hot.accept('./App', () => {
        console.log('HMR App');
        render();
      });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();