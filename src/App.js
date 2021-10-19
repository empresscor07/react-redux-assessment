import {Container} from 'react-bootstrap';
import Login from './components/Login';
import Calendar from './components/Calendar';
import {connect} from "react-redux";
import {initiateLogin, logout, initiateRegister} from "./modules/user";
import {
    initiatePostEventsInWindow,
    initiateCreateEvent,
    initiateDeleteEvent,
    initiateGetEvents,
    initiatePutEvent
} from "./modules/calendar";
import {initiatePostInvite} from "./modules/invites";
import {initiateDeleteTask, initiatePostTask, initiateGetTasks, initiatePostTasksInWindow} from "./modules/tasks";
// I think we need to list the parts of each state that we will be using here as params,
// otherwise would need to put in params as a whole and
// then use notation params.events, params.createEventPending
function App({
                 dispatch,
                 loginPending,
                 loginFailure,
                 token,
                 getEventsPending,
                 getEventsFailure,
                 postFilteredEventsFailure,
                 postFilteredEventsPending,
                 events,
                 createEventPending,
                 createEventFailure,
                 deleteEventFailure,
                 deleteEventPending,
                 putEventPending,
                 putEventFailed,
                 createUserPending,
                 createUserFailure,
                 invitesByEvent,
                 inviteResponses,
                 getInvitesPending,
                 getInvitesFailed,
                 tasks,
                 getTasksPending,
                 getTasksFailed,
                deleteTaskPending,
                deleteTaskFailed

    }) {

    // takes in a time window object submitted by user
    // passes the function we wrote inside calendar module to dispatch with window object as parameter
  function handleFilterEvents(window) {
      dispatch(initiatePostEventsInWindow(window))
  }

    // resets events to show all after filter has been applied
    // passes the function we wrote inside calendar module to dispatch
  function handleResetEvents() {
      dispatch(initiateGetEvents())
  }

    // takes in a username and password value passed by the user
    // passes the function we wrote inside user module to dispatch with credential object as parameter
  function handleLoginRequest(username, password) {
    dispatch(initiateLogin({username, password}))
  }

    // logs out user
    // passes the function we wrote inside user module to dispatch
    // the logout function resets token value to empty string
  function handleLogoutRequest() {
    dispatch(logout())
  }

    // creates new user by taking user entered credentials as argument
    // passes the function we wrote inside user module to dispatch with credentials object as parameter
function handleCreateUserRequest(username, password) {
      dispatch(initiateRegister({username, password}))
}

    // creates new event in event table, takes in field values input by user as an object - event
    // passes the function we wrote inside calendar module to dispatch with the event object as parameter
function handleCreateEvent(event) {
    dispatch(initiateCreateEvent(event))
}

    // Will create a new row in the invite table when the user clicks RSVP and submits a response
    // Takes in the invite object that the user clicked the RSVP button for
    // Takes in the accepted boolean which is changed based on whether user clicked yes or no
    // passes the function we wrote inside invite module to dispatch with the invite object and the accepted bool
function handlePostInvite(invite, accepted) {
      dispatch(initiatePostInvite(invite, accepted))
}

    // handles when user clicks edit button on an event, takes in the event object that the user clicked on
    // passes the function we wrote inside calendar module to dispatch with the event object to update
function handlePutEvent(event) {
      dispatch(initiatePutEvent(event))
}

function handlePostTask(task) {
      // console.log('I will be posting a task here!!!')
      // console.log(task)
      dispatch(initiatePostTask(task))
  }

  function handleDeleteTask(task) {
      // console.log("I will be deleting an event here!")
      // console.log(task)
      dispatch(initiateDeleteTask(task))
  }

    function handleFilterTasks(window) {
        console.log('Filtering Tasks using window below:')
        console.log(window)
        dispatch(initiatePostTasksInWindow(window))
    }

    function handleResetTasks() {
        dispatch(initiateGetTasks())
    }

  return (
      <Container>
        {
          //if token not null then run memos function
          //else run login function to render login screen again.
          token ?
              //pass param with handle login or logout function as the value
              <Calendar
                  handleLogoutRequest={handleLogoutRequest}
                  events={events}
                  handleFilterEvents={handleFilterEvents}
                  handleDeleteEvent={event => dispatch(initiateDeleteEvent(event))}
                  getEventsPending={getEventsPending}
                  getEventsFailure={getEventsFailure}
                  postFilteredEventsFailure={postFilteredEventsFailure}
                  postFilteredEventsPending={postFilteredEventsPending}
                  handleCreateEvent={handleCreateEvent}
                  createEventPending={createEventPending}
                  createEventFailure={createEventFailure}
                  deleteEventPending={deleteEventPending}
                  deleteEventFailure={deleteEventFailure}
                  invitesByEvent={invitesByEvent}
                  inviteResponses={inviteResponses}
                  handleResetEvents={handleResetEvents}
                  handlePostInvite={handlePostInvite}
                  handlePutEvent={handlePutEvent}
                  putEventPending={putEventPending}
                  putEventFailed={putEventFailed}
                  tasks={tasks}
                  getTasksPending={getTasksPending}
                  getTasksFailed={getTasksFailed}
                  handlePostTask={handlePostTask}
                  handleDeleteTask={handleDeleteTask}
                  deleteTaskPending={deleteTaskPending}
                  deleteTaskFailed={deleteTaskFailed}
                  getInvitesFailed={getInvitesFailed}
                  getInvitesPending={getInvitesPending}
                  handleFilterTasks={handleFilterTasks}
                  handleResetTasks={handleResetTasks}
              /> :
              <Login
                  handleLoginRequest={handleLoginRequest}
                  loginFailure={loginFailure}
                  loginPending={loginPending}
                  handleCreateUserRequest={handleCreateUserRequest}
                  createUserPending={createUserPending}
                  createUserFailure={createUserFailure}
              />
        }
      </Container>
  );
}

// MAP STATE TO PROPS
// mapStateToProps function is declared as taking one parameter,
// it will be called whenever the store state changes, and given the store state as the only parameter.
// mapStateToProps is a function which simply returns an object that defines
// what state should be passed into the component by assigning values
// in the state to properties you define in this object.
// The object you return in the mapStateToProps is what your props will be in your component.
function mapStateToProps(state) {
  //return copy of state
  return {...state.user, ...state.calendar, ...state.invites, ...state.tasks}
}

//CONNECT FUNCTION -----------------------------------------------------------------------
//As the first argument passed in to connect,
// mapStateToProps is used for selecting the part of the data from the
// store that the connected component needs.
// It’s frequently referred to as just mapState for short.
export default connect(mapStateToProps)(App);
