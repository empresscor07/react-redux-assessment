//actions
import {requestCalendar} from "../services/calendar";

const GET_EVENTS_REQUEST = 'calendar/events/GET_EVENTS_REQUEST'
const GET_EVENTS_SUCCESS = 'calendar/events/GET_EVENTS_SUCCESS'
const GET_EVENTS_FAILURE = 'memos/events/GET_EVENTS_FAILURE'

//reducer
const initialState = {
    getEventsPending: false,
    getEventsFailure: false,
    events: []
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

//side effects
export function initiateGetEvents() {
    return function getEvents(dispatch, getState) {
        dispatch(getEventsRequest())
        requestCalendar(getState().user.token).then(response => {
            if (!response.ok) {
                dispatch(getEventsFailure())
            }
            response.json().then(json => {
                if (!json.event) {
                    dispatch(getEventsFailure())
                }

                dispatch(getEventsSuccess(json.event))
            })
        })
    }
}