import {Card, CloseButton, Col, Offcanvas, Row, Spinner, Badge, Button} from "react-bootstrap";
import {useState, useEffect} from "react";
//handleDeleteEvent, deleteEventPending put below as parameter
export default function InviteByEvent({invite}) {
    console.log('showing invite inside invite by event component')
    console.log(invite)
    // const [deletePending, setDeletePending] = useState(false)
    const [showDetails, setShowDetails] = useState(false);

    const handleCloseDetails = () => setShowDetails(false);
    const handleShowDetails = () => setShowDetails(true);


    function invite_date(invite) {
        const date = new Date(invite.start_timestamp);
        return (date.getMonth()+1) + '/' + date.getDate() + '/' + date.getFullYear()
    }

    const startDate = new Date(invite.start_timestamp)
    const startTime = startDate.getTime()
    const endDate = new Date(invite.end_timestamp)
    const endTime = endDate.getTime()
    const raw_attendees = invite ? (invite.attendee_list ? invite.attendee_list : []) : []
    const attendee_list = raw_attendees.filter(tag => tag.length > 0)

    // function onDelete() {
    //     setDeletePending(true)
    //     handleDeleteEvent(event)
    // }

    // useEffect(() => {
    //     if (!deleteEventPending) {
    //         setDeletePending(false)
    //     }
    // }, [deleteEventPending])

    return (<Col xs={3} className='my-3'>
            <Card border='dark'>
                <Card.Body>
                    <Card.Subtitle><Row>
                        <Col>{invite_date(invite)}</Col>
                        {/*<Col xs='auto'>{deletePending ? <Spinner animation='border' /> : <CloseButton onClick={onDelete}/>}</Col>*/}
                    </Row></Card.Subtitle>
                    <Card.Text>{invite.title}</Card.Text>
                </Card.Body>
                <Card.Footer border='warning'>
                    <Button variant="info" onClick={handleShowDetails}>
                        Details
                    </Button>

                </Card.Footer>

            </Card>
            <Offcanvas show={showDetails} onHide={handleCloseDetails}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{invite.title}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Row>{invite_date(invite)}</Row>
                    <Row>{invite.description}</Row>
                    <Row>{invite.location}</Row>
                    <Row>{invite.meeting_link}</Row>
                    <Row>from {startTime} until {endTime}</Row>
                </Offcanvas.Body>
                {
                    attendee_list.length > 0 &&
                    <Card.Footer>
                        <Row>
                            Event Invitees:
                        </Row>
                        <Row>
                        {attendee_list.map((attendee, idx) => <Col xs='auto' key={idx}><Badge>{attendee}</Badge></Col>)}
                        </Row>
                    </Card.Footer>
                }
            </Offcanvas>
        </Col>
    )
}