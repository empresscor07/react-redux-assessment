import {
    requestInvites
} from "../services/invites";

//ACTIONS
// plain JavaScript object that must have a type attribute to indicate
// the type of action performed. It tells us what had happened.
// Types should be defined as string constants in your application as given below

const GET_INVITES_REQUEST = 'calendar/events/GET_INVITES_REQUEST'
const GET_INVITES_SUCCESS = 'calendar/events/GET_INVITES_SUCCESS'
const GET_INVITES_FAILURE = 'calendar/events/GET_INVITES_FAILURE'

//REDUCERS
const initialState = {
    getInvitesPending: false,
    getInvitesFailed: false,
    invitesByEvent: [],
    invites: []
}

//Switch case function to return state values based on the type of action executed
export default function reducer(state = initialState, action) {
    switch (action.type) {

        case GET_INVITES_REQUEST:
            return {
                ...state,
                getInvitesPending: true,
                getInvitesFailed: false
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

        default:
            return state
    }
}

//ACTION CREATORS
export function getInvitesRequest() {
    return {type: GET_INVITES_REQUEST}
}

export function getInvitesSuccess(invitesByEvent) {
    // console.log('invite success function triggered')
    // console.log(invitesByEvent)
    return {
        type: GET_INVITES_SUCCESS,
        invitesByEvent: invitesByEvent
    }
}

export function getInvitesFailure() {
    return {type: GET_INVITES_FAILURE}
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

                dispatch(getInvitesSuccess(json.invite_list))
            }, () => dispatch(getInvitesFailure()))
        }, () => dispatch(getInvitesFailure()))
    }
}