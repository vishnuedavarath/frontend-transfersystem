import React from 'react';
import { Provider } from 'react-redux';
import { store } from './__helpers/store';
import { render } from 'react-dom';
import './index.css';
import { App } from './App';
import * as serviceWorker from './serviceWorker';

// import { configureFakeBackend } from './__helpers/fakeBackend';
// configureFakeBackend();

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
