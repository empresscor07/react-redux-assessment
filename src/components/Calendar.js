import {Button, Row, Col, Toast, ToastContainer} from 'react-bootstrap'
import {useEffect, useState} from "react";
import Event from './Event.js';
import NewEvent from "./NewEvent";
import FilterEvents from "./FilterEvents"
import LoadingEvent from "./LoadingEvent";
import InviteByEvent from "./InviteByEvent";
import Task from "./Task";
import NewTask from "./NewTask";
import FilterTasks from "./FilterTasks"
import FilterInvites from "./FilterInvites"

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
                    inviteResponses,
                    handlePutEvent,
                    tasks,
                    getTasksPending,
                    getTasksFailed,
                    handlePostTask,
                    handleDeleteTask,
                    deleteTaskPending,
                    deleteTaskFailed,
                    handleFilterTasks,
                    handleResetTasks,
                    handleFilterInvites,
                    handleResetInvites

}) {
    const [show, setShow] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [showTaskFilter, setShowTaskFilter] = useState(false);
    const [showInviteFilter, setShowInviteFilter] =useState(false);
    const [showReminderFilter, setShowReminderFilter] = useState(false);
    const [showNewTask, setShowNewTask] = useState(false);
    const [showError, setShowError] = useState(getEventsFailure);
    const [postFilterError, setPostFilterError] = useState(postFilteredEventsFailure);
    //handles switching text on filter buttons
    const [showFilteredEventsReset, setShowFilteredEventsReset] = useState(false);
    const [showFilteredTasksReset, setShowFilteredTasksReset] = useState(false);
    const [showFilteredInvitesReset, setShowFilteredInvitesReset] =useState(false);
    const [showFilteredRemindersReset, setShowFilteredRemindersReset] = useState(false);
    const [showGetInvitesError, setShowGetInvitesError] = useState(getInvitesFailed);
    const [showCreateEventError, setCreateEventError] = useState(createEventFailure);
    const [showDeleteEventError, setDeleteEventError] = useState(deleteEventFailure);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseNewTask = () => setShowNewTask(false);
    const handleShowNewTask = () => setShowNewTask(true);
    const handleFilterClose = () => setShowFilter(false);
    const handleFilterTaskClose = () => setShowTaskFilter(false);
    const handleFilterInviteClose = () => setShowInviteFilter(false);
    const handleFilterReminderClose = () => setShowReminderFilter(false);

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
    const handleFilterTaskShow = async () => {
        await setShowTaskFilter(true)
        await handleShowTaskResetButton()
    }
    function handleShowTaskResetButton() {
        setShowFilteredTasksReset(true)
    }
    function handleShowTaskFilterButton() {
        setShowFilteredTasksReset(false)
    }
    const handleFilterInviteShow = async () => {
        await setShowInviteFilter(true)
        await handleShowInviteResetButton()
    }
    function handleShowInviteResetButton() {
        setShowFilteredInvitesReset(true)
    }
    function handleShowInviteFilterButton() {
        setShowFilteredInvitesReset(false)
    }
    const handleFilterReminderShow = async () => {
        await setShowReminderFilter(true)
        await handleShowReminderResetButton()
    }
    function handleShowReminderResetButton() {
        setShowFilteredRemindersReset(true)
    }
    function handleShowReminderFilterButton() {
        setShowFilteredRemindersReset(false)
    }
    const resetEvents = async () => {
        await handleResetEvents()
        await handleShowFilterButton()
    }

    const resetTasks = async () => {
        await handleResetTasks()
        console.log('Resetting Tasks')
        await handleShowTaskFilterButton()
    }

    const resetInvites = async () => {
        await handleResetInvites()
        console.log('Resetting Invites')
        await handleShowInviteFilterButton()
    }

    const resetReminders = async () => {
        // await handleResetReminders()
        console.log('Resetting Reminders')
        await handleShowReminderFilterButton()
    }

    function handleTest() {
        console.log(showGetInvitesError)
    }

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

    return (
        <>
            <NewEvent show={show} handleClose={handleClose} handleCreateEvent={handleCreateEvent}/>
            <FilterEvents showFilter={showFilter} handleFilterClose={handleFilterClose} handleFilterEvents={handleFilterEvents}/>
            <Row className='mt-3'>
                <Col><h1>Events:</h1></Col>
                <Col xs='auto'><Button onClick={handleShow}>New Event</Button></Col>
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
                            handlePutEvent={handlePutEvent}
                            />) :
                        <h2>Loading...</h2>
                }
            </Row>
            {/*<NewInviteResponse show={show} handleClose={handleClose} handleCreateEvent={handleCreateEvent}/>*/}
            <FilterInvites showInviteFilter={showInviteFilter} handleFilterInviteClose={handleFilterInviteClose} handleFilterInvites={handleFilterInvites}/>
            <Row className='mt-3'>
                <Col><h1>Invites:</h1></Col>
                <Col xs='auto'>
                    {
                        showFilteredInvitesReset ?
                            <Button variant='outline-success' onClick={resetInvites}>Reset</Button> :
                            <Button variant='success' onClick={handleFilterInviteShow}>Filter</Button>
                    }
                </Col>
                <Col xs='auto'><Button variant='warning' onClick={handleTest}>Test</Button></Col>
            </Row>
            <Row>
                {
                    invitesByEvent && !getInvitesPending ?
                        invitesByEvent.map((invite, idx) => <InviteByEvent
                            key={idx}
                            invite={invite}
                            handlePostInvite={handlePostInvite}
                        />) :
                        <h2>Loading...</h2>
                }
            </Row>
            <NewTask showNewTask={showNewTask} handleCloseNewTask={handleCloseNewTask} handlePostTask={handlePostTask}/>
            <FilterTasks showTaskFilter={showTaskFilter} handleFilterTaskClose={handleFilterTaskClose} handleFilterTasks={handleFilterTasks}/>
            <Row className='mt-3'>
                <Col><h1>Tasks:</h1></Col>
                <Col xs='auto'><Button onClick={handleShowNewTask}>New Task</Button></Col>
                <Col xs='auto'>
                    {
                        showFilteredTasksReset ?
                            <Button variant='outline-success' onClick={resetTasks}>Reset</Button> :
                            <Button variant='success' onClick={handleFilterTaskShow}>Filter</Button>
                    }
                </Col>
                {/*<Col xs='auto'><Button variant='success' onClick={handleFilterShow}>Filter</Button></Col>*/}
            </Row>
            <Row>
                {
                    tasks && !getTasksPending ?
                        tasks.map((task, idx) => <Task
                            key={idx}
                            task={task}
                            handlePostTask={handlePostTask}
                            handleDeleteTask={handleDeleteTask}
                            deleteTaskPending={deleteTaskPending}
                        />) :
                        <h2>Loading...</h2>
                }
            </Row>
            <Row>
                This is where Reminders will display
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
                {/*// todo add errors for, update event, edit invite, create reminder, show reminders by date range,*/}
                {/*// todo edit reminder, delete reminder, create task, show tasks by date range, edit task, delete a task*/}
            </ToastContainer>
            {createEventPending && <LoadingEvent/>}
        </>
    );
}

export default Calendar;