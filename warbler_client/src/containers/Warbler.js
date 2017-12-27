import React, {Component} from 'react';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {BrowserRouter as Router} from 'react-router-dom';

import {authenticateUser} from '../actions/index';
import rootReducers, {getCurrentUser} from '../reducers/index';
import App from './App';

const middleware = [thunk];
if(process.env.NODE_ENV !== 'production'){
    middleware.push(createLogger());
}

const store = createStore(rootReducers, applyMiddleware(...middleware));

//get user from localStorage while component mounted
let user = getCurrentUser();
if(!!user && JSON.stringify(user) !== "{}"){
    store.dispatch(authenticateUser(user));
}

const Warbler = ()=>{
    return (
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    )}


export default Warbler;