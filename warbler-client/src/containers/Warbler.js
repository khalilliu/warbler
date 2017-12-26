import React, {Component} from 'react';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';

import {authenticateUser} from '../actions/index';
import rootReducers, {getCurrentUser} from '../reducers/index';
import App from './App';

const middleware = [thunk];
if(process.env.NODE_ENV !== 'production'){
    middleware.push(createLogger());
}

const store = createStore(rootReducers, applyMiddleware(...middleware));

//check if user is login
let user = getCurrentUser();
if(user){
    store.dispatch(authenticateUser(user));
}

const Warbler = ()=>{
    <Provider store={store}>
        <App />
    </Provider>
}


export default Warbler;