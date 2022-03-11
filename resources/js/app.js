/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

import React from 'react';
import ReactDOM from 'react-dom';
import Index from './components/index';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Index />
        </Provider>
    </React.StrictMode>,
    document.getElementById('app')
);
