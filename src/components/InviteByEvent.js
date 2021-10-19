import {Card, Col, Offcanvas, Row, Badge, Button} from "react-bootstrap";
import {useState} from "react";
import NewRSVP from "./NewRSVP";
//handleDeleteEvent, deleteEventPending put below as parameter
export default function InviteByEvent({invite, handlePostInvite}) {
    // const [deletePending, setDeletePending] = useState(false)
    const [showDetails, setShowDetails] = useState(false);
    const [showRSVP, setShowRSVP] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const handleCloseDetails = () => setShowDetails(false);
    const handleShowDetails = () => setShowDetails(true);



    function handleRSVP() {
        //modal pops up to allow user to check yes or no
        setShowRSVP(true);
        setDisabled(true);
        //does something with event id to and user id to create a an entry in invite table
        //once table entry has been created, then display going vs not going and an edit response button
    }
    function handleCloseRSVP() {
        setShowRSVP(false)

    }

    function invite_date(invite) {
        const date = new Date(invite.start_timestamp);
        return (date.getMonth()+1) + '/' + date.getDate() + '/' + date.getFullYear()
    }

    // function handleSeeRSVPResponse() {
    //     console.log('See RSVP response click')
    //     //will call the get invite by id here
    //     //place where we will display if user is going or not only visible once invite row created
    // }

    const startDate = new Date(invite.start_timestamp)
    const startTime = startDate.getTime()
    const endDate = new Date(invite.end_timestamp)
    const endTime = endDate.getTime()
    const raw_attendees = invite ? (invite.attendee_list ? invite.attendee_list : []) : []
    const attendee_list = raw_attendees.filter(tag => tag.length > 0)
    // console.log(invite)
    // function onDelete() {
    //     setDeletePending(true)
    //     handleDeleteEvent(event)
    // }

    // useEffect(() => {
    //     if (!deleteEventPending) {
    //         setDeletePending(false)
    //     }
    // }, [deleteEventPending])

    return (
        <>
            <NewRSVP invite={invite} showRSVP={showRSVP} handleCloseRSVP={handleCloseRSVP} handlePostInvite={handlePostInvite}/>
            <Col xs={3} className='my-3'>
            <Card border='dark'>
                <Card.Body>
                    <Card.Subtitle><Row>
                        <Col>{invite_date(invite)}</Col>
                        {/*<Col xs='auto'>{deletePending ? <Spinner animation='border' /> : <CloseButton onClick={onDelete}/>}</Col>*/}
                    </Row></Card.Subtitle>
                    <Card.Text>{invite.title}</Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Button className='mt-1' variant="info" onClick={handleShowDetails}>
                        Details
                    </Button>
                    <Button className='mx-3 mt-1' disabled={disabled} variant="warning" onClick={handleRSVP}>
                        RSVP
                    </Button>
                    {/*<Button className='mt-1' variant="success" onClick={handleSeeRSVPResponse}>*/}
                    {/*    Edit*/}
                    {/*</Button>*/}


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
        </>
    )
}