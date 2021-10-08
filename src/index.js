import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App';
import {createStore, applyMiddleware, combineReducers} from 'redux'
import user from './modules/user'
import events from './modules/calendar'
import {Provider} from "react-redux";

//allows redux to handle side-effects /async calls
const asyncMiddleware = storeAPI => next => action => {
    if (typeof action === 'function') {
        return action(storeAPI.dispatch, storeAPI.getState)
    }
    next(action)
}

const middlewareEnhancer = applyMiddleware(asyncMiddleware)
const rootReducer = combineReducers({user, events})
const store = createStore(rootReducer, middlewareEnhancer)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);