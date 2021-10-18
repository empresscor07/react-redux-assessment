import {Card, CloseButton, Col, Offcanvas, Row, Spinner, Badge, Button} from "react-bootstrap";
import {useState, useEffect} from "react";
// import EditEvent from "./EditEvent";
//more possible parameters: handleDeleteTask, deleteTaskPending, handlePostEvent, handlePutEvent
export default function Task({task}) {
    // console.log(event)
    // const [deletePending, setDeletePending] = useState(false)
    // const [showDetails, setShowDetails] = useState(false);
    const [show, setShow] = useState(false);
    // const handleCloseDetails = () => setShowDetails(false);
    // const handleShowDetails = () => setShowDetails(true);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    function task_date() {
        const date = new Date(task.timestamp);
        return (date.getMonth()+1) + '/' + date.getDate() + '/' + date.getFullYear()
    }
    const date = new Date(task.timestamp);
    const time = date.getTime()
    const raw_step_list = task? (task.step_list ? task.step_list : []) : []
    //only take the steps where there is text not an empty string
    const step_list = raw_step_list.filter(step => step.length > 0)

    // function onDelete() {
    //     setDeleteTaskPending(true)
    //     handleDeleteTask(task)
    // }

    // function onEdit() {
    //     console.log(event)
    //     // handlePostEvent(event)
    // }

    // useEffect(() => {
    //     if (!deleteEventPending) {
    //         setDeletePending(false)
    //     }
    // }, [deleteEventPending])

    return (
        <Col xs={3} className='my-3'>
            {/*/!*<NewEvent show={show} handleClose={handleClose} handleCreateEvent={handleCreateEvent}/>*!/*/}
            {/*<EditEvent show={show} event={event} handleClose={handleClose} handlePutEvent={handlePutEvent} />*/}
            <Card border='dark'>
                <Card.Body>
                    <Card.Subtitle><Row>
                        <Col>{task_date(task)}</Col>
                        {/*<Col xs='auto'>{deletePending ? <Spinner animation='border' /> : <CloseButton onClick={onDelete}/>}</Col>*/}
                    </Row></Card.Subtitle>
                    <Card.Text>{task.title}</Card.Text>
                   <Row>
                       {step_list.map((step, idx) => <Col xs='auto' key={idx}><Badge>{step}</Badge></Col>)}
                   </Row>


                </Card.Body>
                <Card.Footer border='warning'>
                    {/*<Button className='mt-1 mx-3' variant="primary" onClick={handleShow}>*/}
                    {/*    Edit*/}
                    {/*</Button>*/}
                    <Button className='mt-1 mx-3' variant="primary">
                        Edit Dummy button
                    </Button>

                </Card.Footer>

            </Card>
            {/*<Offcanvas show={showDetails} onHide={handleCloseDetails}>*/}
            {/*    <Offcanvas.Header closeButton>*/}
            {/*        <Offcanvas.Title>{event.title}</Offcanvas.Title>*/}
            {/*    </Offcanvas.Header>*/}
            {/*    <Offcanvas.Body>*/}
            {/*        <Row>{event_date(event)}</Row>*/}
            {/*        <Row>{event.description}</Row>*/}
            {/*        <Row>{event.location}</Row>*/}
            {/*        <Row>{event.meeting_link}</Row>*/}
            {/*        <Row>{startTime} to {endTime}</Row>*/}
            {/*    </Offcanvas.Body>*/}
            {/*    {*/}
            {/*        attendee_list.length > 0 &&*/}
            {/*        <Card.Footer><Row>*/}
            {/*            {attendee_list.map((attendee, idx) => <Col xs='auto' key={idx}><Badge>{attendee}</Badge></Col>)}*/}
            {/*        </Row></Card.Footer>*/}
            {/*    }*/}
            {/*</Offcanvas>*/}
        </Col>
    )
}