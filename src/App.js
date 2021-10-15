import {Container} from 'react-bootstrap';
import Login from './components/Login';
import Calendar from './components/Calendar';
import {connect} from "react-redux";
import {initiateLogin, logout, initiateRegister} from "./modules/user";
// import {createMemo, deleteMemo} from "./services/memos";
import {
    initiatePostEventsInWindow,
    initiateCreateEvent,
    initiateDeleteEvent,
    initiateGetEvents
} from "./modules/calendar";
import {initiatePostInvite} from "./modules/invites";

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
                 createUserPending,
                 createUserFailure,
                 invitesByEvent,
                 getInvitesPending,
                 getInvitesFailure
    }) {

  // function handleError (error) {
  //   console.log(error)
  // }
  //   console.log('Showing invitesbyevent object below')
  //   console.log(invitesByEvent)
  //   console.log(events)
  function handleFilterEvents(window) {
      // const windowStart = JSON.stringify(window_start)
      // const windowEnd = JSON.stringify(window_end)
      // console.log(` made it to the handle request events in window ${window.window_end}`)
      dispatch(initiatePostEventsInWindow(window))
  }
  // resets events to show all after filter has been applied
  function handleResetEvents() {
      dispatch(initiateGetEvents())
  }

  function handleLoginRequest(username, password) {
    dispatch(initiateLogin({username, password}))
  }

  function handleLogoutRequest() {
    dispatch(logout())
  }

function handleCreateUserRequest(username, password) {
      dispatch(initiateRegister({username, password}))
}

function handleCreateEvent(event) {
    dispatch(initiateCreateEvent(event))
}

function handlePostInvite(invite, accepted) {
      console.log(invite)
      console.log(accepted)
      dispatch(initiatePostInvite(invite, accepted))
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
                  handleResetEvents={handleResetEvents}
                  handlePostInvite={handlePostInvite}
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

function mapStateToProps(state) {
  //return copy of state
  return {...state.user, ...state.events, ...state.invitesByEvent, ...state.invites}
}


export default connect(mapStateToProps)(App);
