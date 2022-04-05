/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

import React from 'react';
import { createRoot } from 'react-dom/client';
import Index from './components';
import { Provider } from 'react-redux';
import store from './store';

const container = document.getElementById('app');
// @ts-ignore
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Index />
        </Provider>
    </React.StrictMode>
);
