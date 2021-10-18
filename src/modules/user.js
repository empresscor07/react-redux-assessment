import {requestLogin, createUser} from "../services/user";
import {initiateGetEvents} from "./calendar";
import {initiateGetInvites} from "./invites";
import {initiateGetTasks} from "./tasks";

// Actions
const LOGIN_REQUEST = 'calendar/user/LOGIN_REQUEST' //user side initiated
const LOGIN_SUCCESS = 'calendar/user/LOGIN_SUCCESS' //backend initiated
const LOGIN_FAILURE = 'calendar/user/LOGIN_FAILURE' //backend initiated
const LOGOUT = 'calendar/user/LOGOUT' //user side initiated

const CREATE_USER_REQUEST = 'calendar/user/CREATE_USER_REQUEST'
const CREATE_USER_SUCCESS = 'calendar/user/CREATE_USER_SUCCESS'
const CREATE_USER_FAILURE = 'calendar/user/CREATE_USER_FAILURE'

// Reducer
//define initial state
const initialState = {
    loginPending: false,
    loginFailure: false,
    token: '',
    createUserPending: false,
    createUserFailure: false
}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                // deconstruct state
                ...state,
                // set one value to true
                loginPending: true
            };

        case LOGIN_SUCCESS:
            return {
                ...state,
                loginPending: false,
                loginFailure: false,
                token: action.token
            };

        case LOGIN_FAILURE:
            return {
                ...state,
                loginPending: false,
                loginFailure: true
            };

        case CREATE_USER_REQUEST:
            return {
                // deconstruct state
                ...state,
                // set one value to true
                createUserPending: true
            };

        case CREATE_USER_SUCCESS:
            return {
                ...state,
                createUserPending: false,
                createUserFailure: false,
                // token: action.token
            };

        case CREATE_USER_FAILURE:
            return {
                ...state,
                createUserPending: false,
                createUserFailure: true
            };

        case LOGOUT:
            return {
                ...state,
                token: ''
            };

        default:
            return state;
    }
}


// Action Creators
export function loginRequest() {
    return {type: LOGIN_REQUEST}
}

export function loginSuccess(token) {
    // console.log(token)
    return {type: LOGIN_SUCCESS, token: token}
}

export function loginFailure() {
    return {type: LOGIN_FAILURE}
}

export function createUserRequest() {
    return {type: CREATE_USER_REQUEST}
}

export function createUserSuccess() {
    return {type: CREATE_USER_SUCCESS}
}

export function createUserFailure() {
    return {type: CREATE_USER_FAILURE}
}

export function logout() {
    return {type: LOGOUT}
}

// Side Effects

export function initiateLogin(credentials) {
    return function login(dispatch) {
        dispatch(loginRequest())
        requestLogin(credentials).then(response => {
            if (!response.ok) {
                dispatch(loginFailure())
                return
            }
            response.json().then(data => {
                if (!data.token) {
                    dispatch(loginFailure())
                    return
                }

                dispatch(loginSuccess(data.token))
                console.log('Load is working - should get events and invites')
                dispatch(initiateGetEvents())
                dispatch(initiateGetInvites())
                dispatch(initiateGetTasks())
            })
        })
    }
}

export function initiateRegister(credentials) {
    return function register(dispatch) {
        dispatch(createUserRequest())
        createUser(credentials).then(response => {
            if (!response.ok) {
                dispatch(createUserFailure())
                return
            }
            dispatch(createUserSuccess())
            dispatch(initiateLogin(credentials))
        })
    }
}