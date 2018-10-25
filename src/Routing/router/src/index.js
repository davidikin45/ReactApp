import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import App from './views/application/App';
import * as serviceWorker from './utils/serviceWorker';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import configureStore from "./redux/configureStore";
import FullPage from "./components/common/FullPage";


const store = configureStore(window.__STATE__);

ReactDOM.render(
    <Provider store={store}>
     <BrowserRouter>
        <FullPage />
     </BrowserRouter>
    </Provider>, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
 