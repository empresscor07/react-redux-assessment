import {Button, Row, Col, Toast, ToastContainer, Offcanvas} from 'react-bootstrap'
import {useEffect, useState} from "react";
import Event from './Event.js';
import NewEvent from "./NewEvent";
import FilterEvents from "./FilterEvents"
import LoadingEvent from "./LoadingEvent";
import InviteByEvent from "./InviteByEvent";

function Calendar({
                    handleLogoutRequest,
                    handleFilterEvents,
                    handleDeleteEvent,
                    events,
                    getEventsPending,
                    getEventsFailure,
                    postFilteredEventsPending,
                    postFilteredEventsFailure,
                    handleCreateEvent,
                    createEventPending,
                    createEventFailure,
                    deleteEventPending,
                    deleteEventFailure,
                    invitesByEvent,
                    getInvitesPending,
                    getInvitesFailure

}) {
    const [show, setShow] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [showError, setShowError] = useState(getEventsFailure);
    const [postFilterError, setPostFilterError] = useState(postFilteredEventsFailure);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleFilterClose = () => setShowFilter(false);
    const handleFilterShow = async () => {

        await setShowFilter(true);
        console.log(showFilter);
    }
    const [showCreateEventError, setCreateEventError] = useState(createEventFailure);
    const [showDeleteEventError, setDeleteEventError] = useState(deleteEventFailure);


    //TODO these don't show up at the right time yet
    useEffect(() => {
        if (getEventsFailure) {
            setShowError(true)
        }
    }, [getEventsFailure])

    useEffect(() => {
        if (postFilteredEventsFailure) {
            setPostFilterError(true)
        }
    }, [postFilteredEventsFailure])

    useEffect(() => {
        if (createEventFailure) {
            setCreateEventError(true)
        }
    }, [createEventFailure])

    useEffect(() => {
        if (deleteEventFailure) {
            setDeleteEventError(true)
        }
    }, [deleteEventFailure])
    // console.log('This is the calendar page')
    // console.log(invitesByEvent)
    return (
        <>
            <NewEvent show={show} handleClose={handleClose} handleCreateEvent={handleCreateEvent}/>
            <FilterEvents showFilter={showFilter} handleFilterClose={handleFilterClose} handleFilterEvents={handleFilterEvents}/>
            <Row className='mt-3'>
                <Col><h1>Events:</h1></Col>
                <Col xs='auto'><Button onClick={handleShow}>New</Button></Col>
                <Col xs='auto'><Button variant='success' onClick={handleFilterShow}>Filter</Button></Col>
                <Col xs='auto'><Button variant='outline-danger' onClick={handleLogoutRequest}>Logout</Button></Col>
            </Row>
            <Row>
                {
                    events && !getEventsPending ?
                        events.map((event, idx) => <Event
                            key={idx}
                            event={event}
                            handleDeleteEvent={handleDeleteEvent}
                            deleteEventPending={deleteEventPending}
                            />) :
                        <h2>Loading...</h2>
                }
            </Row>
            {/*<NewInvite show={show} handleClose={handleClose} handleCreateEvent={handleCreateEvent}/>*/}
            {/*<FilterEvents showFilter={showFilter} handleFilterClose={handleFilterClose} handleFilterEvents={handleFilterEvents}/>*/}
            <Row className='mt-3'>
                <Col><h1>Invites:</h1></Col>
                {/*<Col xs='auto'><Button onClick={handleShow}>New</Button></Col>*/}
                {/*<Col xs='auto'><Button variant='success' onClick={handleFilterShow}>Filter</Button></Col>*/}
            </Row>
            <Row>
                {
                    invitesByEvent && !getInvitesPending ?
                        invitesByEvent.map((invite, idx) => <InviteByEvent
                            key={idx}
                            invite={invite}
                            // handleDeleteEvent={handleDeleteEvent}
                            // deleteEventPending={deleteEventPending}
                        />) :
                        <h2>Loading...</h2>
                }
            </Row>
            <Row>
                This is where Reminders will display
            </Row>
            <Row>
                This is where Tasks will display
            </Row>

            <ToastContainer className="p-3" position='bottom-end'>
                <Toast bg='danger' onClose={() => setShowError(false)} show={showError} delay={3000} autohide>
                    <Toast.Body className={'text-white'}>Error retrieving memos</Toast.Body>
                </Toast>
                <Toast bg='danger' onClose={() => setPostFilterError(false)} show={postFilterError} delay={3000} autohide>
                    <Toast.Body className={'text-white'}>Error retrieving filtered memos</Toast.Body>
                </Toast>
                <Toast bg='danger' onClose={() => setCreateEventError(false)} show={showCreateEventError} delay={3000} autohide>
                    <Toast.Body className={'text-white'}>Error Creating memo</Toast.Body>
                </Toast>
                <Toast bg='danger' onClose={() => setDeleteEventError(false)} show={showDeleteEventError} delay={3000} autohide>
                    <Toast.Body className={'text-white'}>Error deleting memo</Toast.Body>
                </Toast>
            </ToastContainer>
            {createEventPending && <LoadingEvent/>}
        </>
    );
}

export default Calendar;