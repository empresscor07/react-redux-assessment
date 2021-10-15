import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App';
import {createStore, applyMiddleware, combineReducers} from 'redux'
import user from './modules/user'
import events from './modules/calendar'
import invites from './modules/invites'
import {Provider} from "react-redux";
// import logger from 'redux-logger';

//allows redux to handle side-effects /async calls
const asyncMiddleware = storeAPI => next => action => {
    if (typeof action === 'function') {
        return action(storeAPI.dispatch, storeAPI.getState)
    }
    next(action)
}

//dispatch allows you to dispatch an action to change a state in your application.
//Redux middleware function provides a medium to interact with dispatched
// action before they reach the reducer.
//You can imagine middlewares somewhere between action dispatched and reducer.
// Commonly, middlewares are used to deal with asynchronous actions in your app.
// Redux provides with API called applyMiddleware

//The syntax of using applyMiddleware API is −
const middlewareEnhancer = applyMiddleware(asyncMiddleware) //logger passed here if needed

//A store is an immutable object tree in Redux.
// A store is a state container which holds the application’s state.
// Redux can have only a single store in your application.
// Whenever a store is created in Redux, you need to specify the reducer.

//Combines all reducers to allow one root reducer to be sent to the store
const rootReducer = combineReducers({user, events, invites})

//MIDDLEWARE AND REDUCER can be applied to store as follows −
const store = createStore(rootReducer, middlewareEnhancer)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);