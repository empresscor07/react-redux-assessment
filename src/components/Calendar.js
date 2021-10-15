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
                    handleResetEvents,
                    handleCreateEvent,
                    createEventPending,
                    createEventFailure,
                    deleteEventPending,
                    deleteEventFailure,
                    invitesByEvent,
                    getInvitesPending,
                    getInvitesFailed,
                    handlePostInvite,
                    postInvitesPending,
                    postInvitesFailed,
                    inviteResponses

}) {
    const [show, setShow] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [showError, setShowError] = useState(getEventsFailure);
    const [postFilterError, setPostFilterError] = useState(postFilteredEventsFailure);
    //handles switching text on filter button
    const [showFilteredEventsReset, setShowFilteredEventsReset] = useState(false);
    const [showGetInvitesError, setShowGetInvitesError] = useState(getInvitesFailed);
    const [showCreateEventError, setCreateEventError] = useState(createEventFailure);
    const [showDeleteEventError, setDeleteEventError] = useState(deleteEventFailure);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleFilterClose = () => setShowFilter(false);
    const handleFilterShow = async () => {
        await setShowFilter(true)
        await handleShowResetButton()
    }
    function handleShowResetButton() {
        setShowFilteredEventsReset(true);
    }
    function handleShowFilterButton() {
        setShowFilteredEventsReset(false)
    }
    const resetEvents = async () => {
        await handleResetEvents()
        await handleShowFilterButton()
    }

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

    useEffect(() => {
        if (getInvitesFailed) {
            setShowGetInvitesError(true)
        }
    }, [getInvitesFailed])

    // handles switching text on filter button
    // useEffect(() => {
    //     if (postFilteredEventsSuccess) {
    //         setShowFilteredEventsReset(true)
    //     }
    // }, [postFilteredEventsSuccess])
    // console.log(showFilteredEventsReset);
    // console.log('This is the calendar page')
    // console.log(invitesByEvent)
    return (
        <>
            <NewEvent show={show} handleClose={handleClose} handleCreateEvent={handleCreateEvent}/>
            <FilterEvents showFilter={showFilter} handleFilterClose={handleFilterClose} handleFilterEvents={handleFilterEvents}/>
            <Row className='mt-3'>
                <Col><h1>Events:</h1></Col>
                <Col xs='auto'><Button onClick={handleShow}>New</Button></Col>
                <Col xs='auto'>
                {
                    showFilteredEventsReset ?
                        <Button variant='outline-success' onClick={resetEvents}>Reset</Button> :
                        <Button variant='success' onClick={handleFilterShow}>Filter</Button>
                }
                </Col>
                <Col xs='auto'><Button variant='outline-danger' onClick={handleLogoutRequest}>Logout</Button></Col>
            </Row>
            <Row>
                {
                    events && !(getEventsPending || postFilteredEventsPending) ?
                        events.map((event, idx) => <Event
                            key={idx}
                            event={event}
                            handleDeleteEvent={handleDeleteEvent}
                            deleteEventPending={deleteEventPending}
                            />) :
                        <h2>Loading...</h2>
                }
            </Row>
            {/*<NewInviteResponse show={show} handleClose={handleClose} handleCreateEvent={handleCreateEvent}/>*/}
            {/*<FilterEvents showFilter={showFilter} handleFilterClose={handleFilterClose} handleFilterEvents={handleFilterEvents}/>*/}
            <Row className='mt-3'>
                <Col><h1>Invites:</h1></Col>
                {/*<Col xs='auto'><Button variant='success' onClick={handleFilterShow}>Filter</Button></Col>*/}
            </Row>
            <Row>
                {
                    invitesByEvent && !getInvitesPending ?
                        invitesByEvent.map((invite, idx) => <InviteByEvent
                            key={idx}
                            invite={invite}
                            handlePostInvite={handlePostInvite}
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
                    <Toast.Body className={'text-white'}>Error retrieving filtered Events</Toast.Body>
                </Toast>
                <Toast bg='danger' onClose={() => setCreateEventError(false)} show={showCreateEventError} delay={3000} autohide>
                    <Toast.Body className={'text-white'}>Error Creating Event</Toast.Body>
                </Toast>
                <Toast bg='danger' onClose={() => setDeleteEventError(false)} show={showDeleteEventError} delay={3000} autohide>
                    <Toast.Body className={'text-white'}>Error deleting event</Toast.Body>
                </Toast>
                <Toast bg='danger' onClose={() => setShowGetInvitesError(false)} show={showGetInvitesError} delay={3000} autohide>
                    <Toast.Body className={'text-white'}>Error retrieving Invites</Toast.Body>
                </Toast>
                {/*// todo add errors for get invites, update event, edit invite, create reminder, show reminders by date range,*/}
                {/*// todo edit reminder, delete reminder, create task, show tasks by date range, edit task, delete a task*/}
            </ToastContainer>
            {createEventPending && <LoadingEvent/>}
        </>
    );
}

export default Calendar;