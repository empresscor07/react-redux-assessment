import {
    requestCalendar,
    requestFilteredCalendar,
    createEvent,
    deleteEvent,
    // requestEventById,
    putEvent
} from "../services/calendar";

//ACTIONS
// plain JavaScript object that must have a type attribute to indicate
// the type of action performed. It tells us what had happened.
// Types should be defined as string constants in your application as given below

const GET_EVENTS_REQUEST = 'calendar/events/GET_EVENTS_REQUEST'
const GET_EVENTS_SUCCESS = 'calendar/events/GET_EVENTS_SUCCESS'
const GET_EVENTS_FAILURE = 'calendar/events/GET_EVENTS_FAILURE'

const POST_FILTERED_EVENTS_REQUEST = 'calendar/events/POST_FILTERED_EVENTS_REQUEST'
const POST_FILTERED_EVENTS_SUCCESS = 'calendar/events/POST_FILTERED_EVENTS_SUCCESS'
const POST_FILTERED_EVENTS_FAILURE = 'calendar/events/POST_FILTERED_EVENTS_FAILURE'

const CREATE_EVENT_REQUEST = 'calendar/events/CREATE_EVENT_REQUEST'
const CREATE_EVENT_SUCCESS = 'calendar/events/CREATE_EVENT_SUCCESS'
const CREATE_EVENT_FAILURE = 'calendar/events/CREATE_EVENT_FAILURE'

const DELETE_EVENT_REQUEST = 'calendar/events/DELETE_EVENT_REQUEST'
const DELETE_EVENT_SUCCESS = 'calendar/events/DELETE_EVENT_SUCCESS'
const DELETE_EVENT_FAILURE = 'calendar/events/DELETE_EVENT_FAILURE'

const GET_EVENT_BY_ID_REQUEST = 'calendar/events/GET_EVENT_BY_ID_REQUEST'
const GET_EVENT_BY_ID_SUCCESS = 'calendar/events/GET_EVENT_BY_ID_SUCCESS'
const GET_EVENT_BY_ID_FAILURE = 'calendar/events/GET_EVENT_BY_ID_FAILURE'

const PUT_EVENT_REQUEST = 'calendar/events/PUT_EVENT_REQUEST'
const PUT_EVENT_SUCCESS = 'calendar/events/PUT_EVENT_SUCCESS'
const PUT_EVENT_FAILURE = 'calendar/events/PUT_EVENT_FAILURE'

// REDUCER
// Actions and states are held together by a function called Reducer.
// An action is dispatched with an intention to cause change.
// This change is performed by the reducer.
// Reducer is the only way to change states in Redux

//First we define variables to hold initial state values and set them
const initialState = {
    getEventsPending: false,
    getEventsFailure: false,
    events: [],
    postFilteredEventsPending: false,
    postFilteredEventsFailure: false,
    postFilteredEventsSuccess: false,
    createEventPending: false,
    createEventFailure: false,
    deleteEventFailure: false,
    deleteEventPending: false,
    // getEventByIdPending: false,
    // getEventByIdFailure: false,
    putEventPending: false,
    putEventFailed: false
}

//Switch case function to return state values based on the type of action executed
export default function reducer(state = initialState, action) {
    switch (action.type) {

        case GET_EVENTS_REQUEST:
            return {
                ...state,
                getEventsPending: true,
                postFilteredEventsSuccess: false //this is here to allow toggling between filter and reset button
            }

        case GET_EVENTS_SUCCESS:
            return {
                ...state,
                getEventsPending: false,
                getEventsFailure: false,
                events: action.events
            }

        case GET_EVENTS_FAILURE:
            return {
                ...state,
                getEventsPending: false,
                getEventsFailure: true
            }

        case POST_FILTERED_EVENTS_REQUEST:
            return {
                ...state,
                postFilteredEventsPending: true
            }

        case POST_FILTERED_EVENTS_SUCCESS:
            return {
                ...state,
                postFilteredEventsPending: false,
                postFilteredEventsFailure: false,
                postFilteredEventsSuccess: true,
                events: action.events
            }

        case POST_FILTERED_EVENTS_FAILURE:
            return {
                ...state,
                postFilteredEventsPending: false,
                postFilteredEventsFailure: true,
            }

        // case GET_EVENT_BY_ID_REQUEST:
        //     return {
        //         ...state,
        //         getEventByIdPending: true
        //     }
        //
        // case GET_EVENT_BY_ID_SUCCESS:
        //     return {
        //         ...state,
        //         getEventByIdPending: false,
        //         getEventByIdFailure: false,
        //         events: action.events
        //     }
        //
        // case GET_EVENT_BY_ID_FAILURE:
        //     return {
        //         ...state,
        //         getEventByIdPending: false,
        //         getEventByIdFailure: true,
        //     }

        case CREATE_EVENT_REQUEST:
            return {
                ...state,
                createEventPending: true,
                createEventFailure: false
            }

        case CREATE_EVENT_SUCCESS:
            return {
                ...state,
                createEventPending: false,
                createEventFailure: false
            }

        case CREATE_EVENT_FAILURE:
            return {
                ...state,
                createEventPending: false,
                createEventFailure: true
            }

        case DELETE_EVENT_REQUEST:
            return {...state,
                deleteEventPending: true,
                deleteEventFailure: false}

        case DELETE_EVENT_SUCCESS:
            return {
                ...state,
                deleteEventPending: false,
                deleteEventFailure: false
            }

        case DELETE_EVENT_FAILURE:
            return {
                ...state,
                deleteEventPending: false,
                deleteEventFailure: true
            }

        case PUT_EVENT_REQUEST:
            return {...state,
                putEventPending: true,
                putEventFailure: false}

        case PUT_EVENT_SUCCESS:
            return {
                ...state,
                putEventPending: false,
                putEventFailure: false
            }

        case PUT_EVENT_FAILURE:
            return {
                ...state,
                putEventPending: false,
                putEventFailure: true
            }

        default:
            return state
    }
}


//ACTION CREATORS
//An action is a plain object that describes the intention to cause change with a type property.
// It must have a type property which tells what type of action is being performed.
// Action creators are the functions that encapsulate the process of creation of an action object.
// These functions simply return a plain Js object which is an action.
// It promotes writing clean code and helps to achieve re-usability.
// It also allows you to pass in parameters if you want to send data with the action


export function getEventsRequest() {
    return {type: GET_EVENTS_REQUEST}
}

export function getEventsSuccess(events) {
    console.log(events)
    console.log('get events success')
    return {
        type: GET_EVENTS_SUCCESS,
        events: events
    }
}

export function getEventsFailure() {
    return {type: GET_EVENTS_FAILURE}
}

export function postFilteredEventsRequest() {
    return {type: POST_FILTERED_EVENTS_REQUEST}
}

export function postFilteredEventsSuccess(events) {
    return {
        type: POST_FILTERED_EVENTS_SUCCESS,
        events: events
    }
}

export function postFilteredEventsFailure() {
    return {type: POST_FILTERED_EVENTS_FAILURE}
}

// export function getEventByIdRequest() {
//     return {type: GET_EVENT_BY_ID_REQUEST}
// }
//
// // export function getEventByIdSuccess(events) {
// //     return {
// //         type: GET_EVENT_BY_ID_SUCCESS,
// //         events: events
// //     }
// // }
//
// export function getEventByIdFailure() {
//     return {type: GET_EVENT_BY_ID_FAILURE}
// }

function createEventRequest() {
    return {type: CREATE_EVENT_REQUEST}
}

function createEventSuccess() {
    return {type: CREATE_EVENT_SUCCESS}
}

function createEventFailure() {
    return {type: CREATE_EVENT_FAILURE}
}

function deleteEventRequest() {
    return {type: DELETE_EVENT_REQUEST}
}

function deleteEventSuccess() {
    return {type: DELETE_EVENT_SUCCESS}
}

function deleteEventFailure() {
    return {type: DELETE_EVENT_FAILURE}
}

function putEventRequest(){
    return {type: PUT_EVENT_REQUEST}
}

function putEventSuccess(){
    return {type: PUT_EVENT_SUCCESS}
}

function putEventFailure(){
    return {type: PUT_EVENT_FAILURE}
}



// SIDE EFFECTS
// Web apps need to execute complex logic,
// usually including asynchronous work such as making AJAX requests.
// That code is no longer purely a function of its inputs,
// and the interactions with the outside world are known as “side effects”
// Redux is inspired by functional programming,
// and out of the box, has no place for side effects to be executed.
// In particular, reducer functions must always be pure functions of
// (state, action) => newState. However, Redux's middleware makes it possible
// to intercept dispatched actions and add additional complex behavior around them,
// including side effects.

//dispatch allows you to dispatch an action to change a state in your application.
export function initiateGetEvents() {
    // Write a function that has `dispatch` and `getState` as arguments
    return function getEvents(dispatch, getState) {
        dispatch(getEventsRequest())
        // Make an async HTTP request
        requestCalendar(getState().user.token).then(response => {
            if (!response.ok) {
                dispatch(getEventsFailure())
                return
            }
            response.json().then(json => {
                if (!json.event_list) {
                    dispatch(getEventsFailure())
                    return
                }
                // Dispatch an action with the event list we received from async call
                dispatch(getEventsSuccess(json.event_list))
            }, () => dispatch(getEventsFailure()))
        }, () => dispatch(getEventsFailure()))
    }
}

export function initiatePostEventsInWindow(window) {
    return function postEventsInWindow(dispatch, getState) {
        dispatch(postFilteredEventsRequest())
        requestFilteredCalendar(getState().user.token, window).then(response => {
            if (!response.ok) {
                console.log('response not ok')
                dispatch(postFilteredEventsFailure())
                return
            }
            response.json().then(json => {
                if (!json.event_list) {
                    console.log(`no event list ${response.json()}`)
                    dispatch(postFilteredEventsFailure())
                    return
                }

                dispatch(postFilteredEventsSuccess(json.event_list))
            }, () => dispatch(postFilteredEventsFailure()))
        }, () => dispatch(postFilteredEventsFailure()))
    }
}

// export function initiateGetEventById(event) {
//     return function eventByIdDispatcher(dispatch, getState) {
//         dispatch(getEventByIdRequest())
//         requestEventById(getState().user.token, event).then(response => {
//             if (!response.ok) {
//                 dispatch(getEventByIdFailure())
//                 return
//             }
//
//             response.json().then(json => {
//                 if (!json.event_list) {
//                     console.log(`no event details found`)
//                     dispatch(getEventByIdFailure())
//                     return
//                 }
//
//                 dispatch(getEventByIdSuccess(json.event_list[0]))
//                 // dispatch(initiateGetEvents())
//             }, () => dispatch(getEventByIdFailure()))
//         }, () => dispatch(getEventByIdFailure()))
//     }
// }

export function initiateCreateEvent(event) {
    return function createEventDispatcher(dispatch, getState) {
        console.log(event)
        dispatch(createEventRequest())
        createEvent(getState().user.token, event).then(response => {
            if (!response.ok) {
                dispatch(createEventFailure())
                return
            }

            response.json().then(json => {
                if (!json.message) {
                    dispatch(createEventFailure())
                    return
                }

                if (json.message !== 'created') {
                    dispatch(createEventFailure())
                    return
                }

                dispatch(createEventSuccess())
                dispatch(initiateGetEvents())
            }, () => dispatch(createEventFailure()))
        }, () => dispatch(createEventFailure()))
    }
}

export function initiateDeleteEvent(event) {
    return function deleteEventDispatcher(dispatch, getState) {
        dispatch(deleteEventRequest())
        deleteEvent(getState().user.token, event).then(response => {
            if (!response.ok) {
                dispatch(deleteEventFailure())
                return
            }

            response.json().then(json => {
                if (!json.message) {
                    dispatch(deleteEventFailure())
                    return
                }

                if (json.message !== 'delete') {
                    dispatch(deleteEventFailure())
                    return
                }

                dispatch(deleteEventSuccess())
                dispatch(initiateGetEvents())
            }, () => dispatch(deleteEventFailure()))
        }, () => dispatch(deleteEventFailure()))
    }
}

export function initiatePutEvent(event) {
    return function putEventDispatcher(dispatch, getState) {
        dispatch(putEventRequest())
        putEvent(getState().user.token, event).then(response => {
            if (!response.ok) {
                dispatch(putEventFailure())
                return
            }

            response.json().then(json => {
                if (!json.message) {
                    dispatch(putEventFailure())
                    return
                }

                if (json.message !== 'delete') {
                    dispatch(putEventFailure())
                    return
                }

                dispatch(putEventSuccess())
                dispatch(initiateGetEvents())
            }, () => dispatch(putEventFailure()))
        }, () => dispatch(putEventFailure()))
    }
}