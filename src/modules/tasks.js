import {
    requestTasks
} from "../services/tasks";


//ACTIONS
// plain JavaScript object that must have a type attribute to indicate
// the type of action performed. It tells us what had happened.
// Types should be defined as string constants in your application as given below

const GET_TASKS_REQUEST = 'calendar/task/GET_TASKS_REQUEST'
const GET_TASKS_SUCCESS = 'calendar/task/GET_TASKS_SUCCESS'
const GET_TASKS_FAILURE = 'calendar/task/GET_TASKS_FAILURE'

//REDUCERS
const initialState = {
    getTasksPending: false,
    getTasksFailed: false,
    tasks: []
}

//Switch case function to return state values based on the type of action executed
export default function reducer(state = initialState, action) {
    switch (action.type) {

        case GET_TASKS_REQUEST:
            return {
                ...state,
                getTasksPending: true,
                getTasksFailed: false
            }

        case GET_TASKS_SUCCESS:
            return {
                ...state,
                getTasksPending: false,
                getTasksFailed: false,
                tasks: action.tasks
            }
        case GET_TASKS_FAILURE:
            return {
                ...state,
                getTasksPending: false,
                getTasksFailed: true
            }
        default:
            return state
    }
}

//ACTION CREATORS
export function getTasksRequest() {
    return {type: GET_TASKS_REQUEST}
}

export function getTasksSuccess(tasks) {
    // console.log('invite success function triggered')
    // console.log(invitesByEvent)
    return {
        type: GET_TASKS_SUCCESS,
        tasks: tasks
    }
}

export function getTasksFailure() {
    return {type: GET_TASKS_FAILURE}
}

//SIDE EFFECTS
export function initiateGetTasks() {
    return function getTasks(dispatch, getState) {
        dispatch(getTasksRequest())
        requestTasks(getState().user.token).then(response => {
            if (!response.ok) {
                dispatch(getTasksFailure())
                return
            }

            response.json().then(json => {
                if (!json.task_list) {
                    dispatch(getTasksFailure())
                    console.log('no task_list in returned json')
                    return
                }

                dispatch(getTasksSuccess(json.task_list))
            }, () => dispatch(getTasksFailure()))
        }, () => dispatch(getTasksFailure()))
    }
}