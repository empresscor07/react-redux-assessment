import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App';
import {createStore, applyMiddleware, combineReducers} from 'redux'
import user from './modules/user'
import calendar from './modules/calendar'
import invites from './modules/invites'
import tasks from './modules/tasks'
import {Provider} from "react-redux";
import logger from 'redux-logger';

// COMPLEX FUNCTION DEFINING ASYNC MIDDLEWARE -------------------------------------
//allows redux to handle side-effects /async calls
// 1. stores a function inside asyncMiddleware that takes in the object storeAPI as an argument
// 2. Returns a function which takes in the next function as a parameter
// 3. Returns a function that takes in action as a parameter
//     a. This function tests to see if action is another function
//     b. If action is a function, returns the results of running action with parameters from storeAPI object
//     c. If action is not a function, runs the function next with action as a parameter
const asyncMiddleware = storeAPI => next => action => {
    // If the "action" is actually a function instead...
    if (typeof action === 'function') {
        // then call the function and pass `dispatch` and `getState` as arguments
        return action(storeAPI.dispatch, storeAPI.getState)
    }
    // Otherwise, it's a normal action - send it onwards
    next(action)
}
// This lets us write async logic in separate functions, outside of the middleware definition.
// This lets us pass a function to dispatch! Inside that function,
// we were able to write some async logic (an HTTP request),
// then dispatch a normal action object when the request completed.


// MIDDLEWARE -----------------------------------------------------------
// Redux middleware function provides a medium to interact with dispatched
// action before they reach the reducer.
// You can imagine middlewares somewhere between action dispatched and reducer.
// each middleware requires no knowledge of what comes before or after it in the chain.
// Commonly, middlewares are used to deal with asynchronous actions in your app.
// Redux provides with API called applyMiddleware

// DISPATCH -------------------------------------------------------------
// dispatch is a function of the Redux store.
// dispatch allows you to dispatch an action to change a state in your application.
// You call store.dispatch to dispatch an action.
// This is the only way to trigger a state change.




//The syntax of using applyMiddleware API is −
const middlewareEnhancer = applyMiddleware(asyncMiddleware) //logger passed here if needed



//Combines all reducers to allow one root reducer to be sent to the store
const rootReducer = combineReducers({user, calendar, invites, tasks})

// STORE -------------------------------------------------------------------
// A store is a state container which holds the application’s state.
// you don’t access it directly -
// You access it and make changes to it using reducers, actions and dispatch.
// A store is an immutable object tree in Redux.
// Redux can have only a single store in your application.
// Whenever a store is created in Redux, you need to specify the reducer.

//MIDDLEWARE AND REDUCER can be applied to store as follows −
const store = createStore(rootReducer, middlewareEnhancer)

// TODO The store is then passed in as a prop to the Provider component.
// The <Provider> component makes the Redux store available to any
// nested components that need to access the Redux store.
// Since any React component in a React Redux app can be connected to the store,
// most applications will render a <Provider> at the top level,
// with the entire app’s component tree inside of it.


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// About access to store and states
// You pass the store in as a prop to the Provider only.
// This means you don’t need to pass in the store as a prop to every
// component as each component gets it from the Provider.
// However, this doesn’t mean the components have access to the state yet.
// You still need to use the mapStateToProps to have the state accessible in your component.