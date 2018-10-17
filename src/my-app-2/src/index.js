import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import Conversion from './containers/Conversion'
import configureStore from "./store/configureStore";
const store = configureStore(window.__STATE__);

ReactDOM.render(<Provider store={store}>
                    <Conversion />
                </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
