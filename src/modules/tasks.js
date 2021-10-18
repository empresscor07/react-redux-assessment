import {
    requestTasks,
    postTask
} from "../services/tasks";

//ACTIONS
// plain JavaScript object that must have a type attribute to indicate
// the type of action performed. It tells us what had happened.
// Types should be defined as string constants in your application as given below

const GET_TASKS_REQUEST = 'calendar/task/GET_TASKS_REQUEST'
const GET_TASKS_SUCCESS = 'calendar/task/GET_TASKS_SUCCESS'
const GET_TASKS_FAILURE = 'calendar/task/GET_TASKS_FAILURE'

const POST_TASK_REQUEST = 'calendar/task/POST_TASK_REQUEST'
const POST_TASK_SUCCESS = 'calendar/task/POST_TASK_SUCCESS'
const POST_TASKS_FAILURE = 'calendar/task/POST_TASKS_FAILURE'

//REDUCERS
const initialState = {
    getTasksPending: false,
    getTasksFailed: false,
    tasks: [],
    postTaskPending: false,
    postTaskFailed: false
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

        case POST_TASK_REQUEST:
            return {
                ...state,
                postTaskPending: true
            }
        case POST_TASK_SUCCESS:
            return {
                ...state,
                postTaskPending: false,
                postTaskFailed: false
            }
        case POST_TASKS_FAILURE:
            return {
                postTaskPending: false,
                postTaskFailed: true
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
    return {
        type: GET_TASKS_SUCCESS,
        tasks: tasks
    }
}

export function getTasksFailure() {
    return {type: GET_TASKS_FAILURE}
}

export function postTaskRequest() {
    return {type: POST_TASK_REQUEST}
}

export function postTaskSuccess() {
    return {type: POST_TASK_SUCCESS}
}

export function postTaskFailure() {
    return {type: POST_TASKS_FAILURE}
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

export function initiatePostTask(task) {
    return function postTaskDispatcher(dispatch, getState) {
        console.log(task)
        dispatch(postTaskRequest())
        postTask(getState().user.token, task).then(response => {
            if (!response.ok) {
                dispatch(postTaskFailure())
                return
            }

            response.json().then(json => {
                if (!json.message) {
                    dispatch(postTaskFailure())
                    return
                }

                if (json.message !== 'created') {
                    dispatch(postTaskFailure())
                    return
                }

                dispatch(postTaskSuccess())
                dispatch(initiateGetTasks())
            }, () => dispatch(postTaskFailure()))
        }, () => dispatch(postTaskFailure()))
    }
}