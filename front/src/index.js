import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {createStore} from 'redux';
import './assets/style/index.css';
import App from './Routes/App';
import reducer from "./reducers"



export const store = createStore(reducer)

ReactDOM.render(
    <Provider store = {store}>
        <App />
    </Provider>, document.getElementById('root'));

