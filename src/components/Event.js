import {Card, CloseButton, Col, Offcanvas, Row, Spinner, Badge, Button} from "react-bootstrap";
import {useState, useEffect} from "react";

export default function Event({event, handleDeleteEvent, deleteEventPending}) {

    const [deletePending, setDeletePending] = useState(false)
    const [showDetails, setShowDetails] = useState(false);

    const handleCloseDetails = () => setShowDetails(false);
    const handleShowDetails = () => setShowDetails(true);


    function event_date(event) {
        const date = new Date(event.start_timestamp);
        return (date.getMonth()+1) + '/' + date.getDate() + '/' + date.getFullYear()
    }

    const startDate = new Date(event.start_timestamp)
    const startTime = startDate.getTime()
    const endDate = new Date(event.end_timestamp)
    const endTime = endDate.getTime()
    const raw_attendees = event ? (event.attendee_list ? event.attendee_list : []) : []
    const attendee_list = raw_attendees.filter(tag => tag.length > 0)

    function onDelete() {
        setDeletePending(true)
        handleDeleteEvent(event)
    }

    useEffect(() => {
        if (!deleteEventPending) {
            setDeletePending(false)
        }
    }, [deleteEventPending])

    return (<Col xs={3} className='my-3'>
        <Card border='dark'>
            <Card.Body>
                <Card.Subtitle><Row>
                    <Col>{event_date(event)}</Col>
                    <Col xs='auto'>{deletePending ? <Spinner animation='border' /> : <CloseButton onClick={onDelete}/>}</Col>
                </Row></Card.Subtitle>
                <Card.Text>{event.title}</Card.Text>
            </Card.Body>
            <Card.Footer border='warning'>
                <Button variant="info" onClick={handleShowDetails}>
                    Details
                </Button>

            </Card.Footer>

        </Card>
            <Offcanvas show={showDetails} onHide={handleCloseDetails}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{event.title}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Row>{event_date(event)}</Row>
                    <Row>{event.description}</Row>
                    <Row>{event.location}</Row>
                    <Row>{event.meeting_link}</Row>
                    <Row>{startTime} to {endTime}</Row>
                </Offcanvas.Body>
                {
                    attendee_list.length > 0 &&
                    <Card.Footer><Row>
                        {attendee_list.map((attendee, idx) => <Col xs='auto' key={idx}><Badge>{attendee}</Badge></Col>)}
                    </Row></Card.Footer>
                }
            </Offcanvas>
    </Col>
    )
}