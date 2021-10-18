import {
    requestInvites,
    postInvite,
    // putInvite
} from "../services/invites";
import {requestFilteredCalendar} from "../services/calendar";
import {postFilteredEventsFailure, postFilteredEventsRequest, postFilteredEventsSuccess} from "./calendar";

//ACTIONS
// plain JavaScript object that must have a type attribute to indicate
// the type of action performed. It tells us what had happened.
// Types should be defined as string constants in your application as given below

const GET_INVITES_REQUEST = 'calendar/invite/GET_INVITES_REQUEST'
const GET_INVITES_SUCCESS = 'calendar/invite/GET_INVITES_SUCCESS'
const GET_INVITES_FAILURE = 'calendar/invite/GET_INVITES_FAILURE'

const POST_INVITE_REQUEST = 'calendar/invite/POST_INVITE_REQUEST'
const POST_INVITE_SUCCESS = 'calendar/invite/POST_INVITE_SUCCESS'
const POST_INVITE_FAILURE = 'calendar/invite/POST_INVITE_FAILURE'

const PUT_INVITE_REQUEST = 'calendar/invite/PUT_INVITE_REQUEST'
const PUT_INVITE_SUCCESS = 'calendar/invite/PUT_INVITE_SUCCESS'
const PUT_INVITE_FAILURE = 'calendar/invite/PUT_INVITE_FAILURE'
//REDUCERS
const initialState = {
    getInvitesPending: false,
    getInvitesFailed: false,
    postInvitePending: false,
    postInviteFailed: false,
    invitesByEvent: [],
    inviteResponses: [],
    putInvitePending: false,
    putInviteFailed: false
}

//Switch case function to return state values based on the type of action executed
export default function reducer(state = initialState, action) {
    switch (action.type) {

        case GET_INVITES_REQUEST:
            return {
                ...state,
                getInvitesPending: true
            }

        case GET_INVITES_SUCCESS:
            return {
                ...state,
                getInvitesPending: false,
                getInvitesFailed: false,
                invitesByEvent: action.invitesByEvent
            }

        case GET_INVITES_FAILURE:
            return {
                ...state,
                getInvitesPending: false,
                getInvitesFailed: true
            }

        case POST_INVITE_REQUEST:
            return {
                ...state,
                postInvitePending: true,
                postInviteFailed: false
            }

        case POST_INVITE_SUCCESS:
            return {
                ...state,
                postInvitePending: false,
                postInviteFailed: false,
            }

        case POST_INVITE_FAILURE:
            return {
                ...state,
                postInvitePending: false,
                postInviteFailed: true
            }

        case PUT_INVITE_REQUEST:
            return {
                ...state,
                putInvitePending: true,
                putInviteFailed: false
            }

        case PUT_INVITE_SUCCESS:
            return {
                ...state,
                putInvitePending: false,
                putInviteFailed: false,
            }

        case PUT_INVITE_FAILURE:
            return {
                ...state,
                putInvitePending: false,
                putInviteFailed: true
            }

        default:
            return state
    }
}

//ACTION CREATORS
export function getInvitesRequest() {
    return {type: GET_INVITES_REQUEST}
}

export function getInvitesSuccess(invitesByEvent) {
    console.log('invite success function triggered')
    console.log(invitesByEvent)
    return {
        type: GET_INVITES_SUCCESS,
        invitesByEvent: invitesByEvent
    }
}

export function getInvitesFailure() {
    return {type: GET_INVITES_FAILURE}
}

export function postInviteRequest() {
    return {type: POST_INVITE_REQUEST}
}

export function postInviteSuccess() {
    return {type: POST_INVITE_SUCCESS}
}

export function postInviteFailure() {
    return {type: GET_INVITES_FAILURE}
}

export function putInviteRequest() {
    return {type: PUT_INVITE_REQUEST}
}

export function putInviteSuccess() {
    return {type: PUT_INVITE_SUCCESS}
}

export function putInviteFailure() {
    return {type: PUT_INVITE_FAILURE}
}

//SIDE EFFECTS
export function initiateGetInvites() {
    return function getInvites(dispatch, getState) {
        dispatch(getInvitesRequest())
        requestInvites(getState().user.token).then(response => {
            if (!response.ok) {
                dispatch(getInvitesFailure())
                return
            }

            response.json().then(json => {
                if (!json.invite_list) {
                    dispatch(getInvitesFailure())
                    console.log('no invite_list in returned json')
                    return
                }
                console.log(json.invite_list)
                console.log('my invite list now ')
                dispatch(getInvitesSuccess(json.invite_list))
            }, () => dispatch(getInvitesFailure()))
        }, () => dispatch(getInvitesFailure()))
    }
}

export function initiatePostInvite(invite, accepted) {
    return function postInviteDispatcher(dispatch, getState) {
        console.log(` initiate post invite values: ${invite.id}, accepted: ${accepted}`)
        // console.log(stringWindow)
        dispatch(postInviteRequest())
        postInvite(getState().user.token, invite, accepted).then(response => {
            if (!response.ok) {
                console.log('response not ok')
                dispatch(postInviteFailure())
                return
            }
            response.json().then(json => {
                if (!json.message) {
                    dispatch(postInviteFailure())
                    return
                }

                if (json.message !== 'created') {
                    dispatch(postInviteFailure())
                    return
                }

                dispatch(postInviteSuccess())
            }, () => dispatch(postInviteFailure()))
        }, () => dispatch(postInviteFailure()))
    }
}

// export function initiatePutInvite(inviteRSVP, accepted) {
//     return function postInviteDispatcher(dispatch, getState) {
//         console.log(` initiate post invite values: ${inviteRSVP.id}, accepted: ${accepted}`)
//         // console.log(stringWindow)
//         dispatch(putInviteRequest())
//         putInvite(getState().user.token, inviteRSVP, accepted).then(response => {
//             if (!response.ok) {
//                 console.log('response not ok')
//                 dispatch(putInviteFailure())
//                 return
//             }
//             response.json().then(json => {
//                 if (!json.message) {
//                     dispatch(putInviteFailure())
//                     return
//                 }
//
//                 if (json.message !== 'updated') {
//                     dispatch(putInviteFailure())
//                     return
//                 }
//
//                 dispatch(putInviteSuccess())
//             }, () => dispatch(putInviteFailure()))
//         }, () => dispatch(putInviteFailure()))
//     }
// }