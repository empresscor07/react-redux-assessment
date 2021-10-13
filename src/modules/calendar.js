//actions
import {requestCalendar, requestFilteredCalendar, createEvent} from "../services/calendar";

const GET_EVENTS_REQUEST = 'calendar/events/GET_EVENTS_REQUEST'
const GET_EVENTS_SUCCESS = 'calendar/events/GET_EVENTS_SUCCESS'
const GET_EVENTS_FAILURE = 'calendar/events/GET_EVENTS_FAILURE'

const POST_FILTERED_EVENTS_REQUEST = 'calendar/events/POST_FILTERED_EVENTS_REQUEST'
const POST_FILTERED_EVENTS_SUCCESS = 'calendar/events/POST_FILTERED_EVENTS_SUCCESS'
const POST_FILTERED_EVENTS_FAILURE = 'calendar/events/POST_FILTERED_EVENTS_FAILURE'

const CREATE_EVENT_REQUEST = 'calendar/events/CREATE_EVENT_REQUEST'
const CREATE_EVENT_SUCCESS = 'calendar/events/CREATE_EVENT_SUCCESS'
const CREATE_EVENT_FAILURE = 'calendar/events/CREATE_EVENT_FAILURE'

// const DELETE_MEMO_REQUEST = 'memos/memos/DELETE_MEMO_REQUEST'
// const DELETE_MEMO_SUCCESS = 'memos/memos/DELETE_MEMO_SUCCESS'
// const DELETE_MEMO_FAILURE = 'memos/memos/DELETE_MEMO_FAILURE'

//reducer
const initialState = {
    getEventsPending: false,
    getEventsFailure: false,
    events: [],
    postFilteredEventsPending: false,
    postFilteredEventsFailure: false,
    createEventPending: false,
    createEventFailure: false
}

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case GET_EVENTS_REQUEST:
            return {
                ...state,
                getEventsPending: true
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
                events: action.events
            }

        case POST_FILTERED_EVENTS_FAILURE:
            return {
                ...state,
                postFilteredEventsPending: false,
                postFilteredEventsFailure: true,
            }

        case CREATE_EVENT_REQUEST:
            return {...state, createEventPending: true}

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

        // case DELETE_MEMO_REQUEST:
        //     return {...state,
        //         deleteMemoPending: true,
        //         deleteMemoFailure: false}
        //
        // case DELETE_MEMO_SUCCESS:
        //     return {
        //         ...state,
        //         deleteMemoPending: false,
        //         deleteMemoFailure: false
        //     }
        //
        // case DELETE_MEMO_FAILURE:
        //     return {
        //         ...state,
        //         deleteMemoPending: false,
        //         deleteMemoFailure: true
        //     }
        default:
            return state
    }
}


//action creators
export function getEventsRequest() {
    return {type: GET_EVENTS_REQUEST}
}

export function getEventsSuccess(events) {
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

function createEventRequest() {
    return {type: CREATE_EVENT_REQUEST}
}

function createEventSuccess() {
    return {type: CREATE_EVENT_SUCCESS}
}

function createEventFailure() {
    return {type: CREATE_EVENT_FAILURE}
}

// function deleteEventRequest() {
//     return {type: DELETE_EVENT_REQUEST}
// }
//
// function deleteEventSuccess() {
//     return {type: DELETE_EVENT_SUCCESS}
// }
//
// function deleteEventFailure() {
//     return {type: DELETE_EVENT_FAILURE}
// }

//side effects
export function initiateGetEvents() {
    return function getEvents(dispatch, getState) {
        dispatch(getEventsRequest())
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

                dispatch(getEventsSuccess(json.event_list))
            }, () => dispatch(getEventsFailure()))
        }, () => dispatch(getEventsFailure()))
    }
}

export function initiatePostEventsInWindow(window) {
    return function postEventsInWindow(dispatch, getState) {
        console.log(window)
        // const stringWindow = JSON.stringify(window)
        // console.log(stringWindow)
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

// export function initiateDeleteMemo(memo) {
//     return function deleteMemoDispatcher(dispatch, getState) {
//         dispatch(deleteMemoRequest())
//         deleteMemo(getState().user.token, memo).then(response => {
//             if (!response.ok) {
//                 dispatch(deleteMemoFailure())
//                 return
//             }
//
//             response.json().then(json => {
//                 if (!json.message) {
//                     dispatch(deleteMemoFailure())
//                     return
//                 }
//
//                 if (json.message !== 'delete') {
//                     dispatch(deleteMemoFailure())
//                     return
//                 }
//
//                 dispatch(deleteMemoSuccess())
//                 dispatch(initiateGetMemos())
//             }, () => dispatch(deleteMemoFailure()))
//         }, () => dispatch(deleteMemoFailure()))
//     }
// }