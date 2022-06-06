require('./bootstrap');
import '../css/app.css';
import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import App from './components/App';
import { Provider } from 'react-redux';
import store from './store';

const container = document.getElementById('app');
const root: Root = createRoot(container ?? new HTMLDivElement());
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
