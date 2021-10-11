import {Container} from 'react-bootstrap';
import Login from './components/Login';
import Events from './components/Calendar'
// import {createMemo, deleteMemo} from "./services/memos";
import {connect} from "react-redux";
import {initiateLogin, logout} from "./modules/user";
import {initiateGetEvents, initiatePostEventsInWindow} from "./modules/calendar";

function App({
               dispatch,
               loginPending,
               loginFailure,
               token,
               getEventsPending,
               getEventsFailure,
               events}) {

  // function handleError (error) {
  //   console.log(error)
  // }

  function handleRequestEventsInWindow(window_start, window_end) {
    const window = JSON.stringify({window_start, window_end})
    dispatch(initiatePostEventsInWindow(window))
  }

  function handleLoginRequest(username, password) {
    dispatch(initiateLogin({username, password}))
  }

  function handleLogoutRequest() {
    dispatch(logout())
  }

  // function handleCreateMemo(memo) {
  //   createMemo(token, memo).then(data => data.json(), handleError).then(json => {
  //     console.log(json)
  //     handleRequestMemos();
  //   }, handleError).catch(handleError)
  //
  // }
  //
  // async function handleDeleteMemo(memo) {
  //   await deleteMemo(token, memo)
  //   handleRequestMemos();
  //
  // }

  return (
      <Container>
        {
          //if token not null then run memos function
          //else run login function to render login screen again.
          token ?
              //pass param with handle login or logout function as the value
              <Events
                  handleLogoutRequest={handleLogoutRequest}
                  events={events}
                  handleRequestEventsInWindow={handleRequestEventsInWindow}
              /> :
              <Login
                  handleLoginRequest={handleLoginRequest}
                  loginFailure={loginFailure}
                  loginPending={loginPending}
              />
        }
      </Container>
  );
}

function mapStateToProps(state) {
  //return copy of state
  return {...state.user, ...state.events}
}


export default connect(mapStateToProps)(App);
