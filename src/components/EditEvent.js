import {Button, Form, Modal} from "react-bootstrap";
import {useState} from "react";

export default function EditEvent({event, show, handleClose, handlePutEvent}) {
    const [title, setEventTitle] = useState(event.title);
    const [attendees, setAttendees] = useState(event.attendee_list);
    const [description, setEventDescription] = useState(event.description);
    const [location, setEventLocation] = useState(event.location);
    const [meeting_link, setEventLink] = useState(event.meeting_link);
    const [start_timestamp, setEventStart] = useState(event.start_timestamp);
    const [end_timestamp, setEventEnd] = useState(event.end_timestamp);
    let attendee_list;
    const calEvent = event;
    function handleSubmit(event) {
        event.preventDefault()
        if (typeof attendees === 'string') {
            attendee_list = attendees.split(',')
        } else {
            attendee_list = attendees
        }

        handleClose()
        calEvent.title = title
        calEvent.attendee_list = attendee_list
        calEvent.description = description
        calEvent.location = location
        calEvent.meeting_link = meeting_link
        calEvent.start_timestamp = start_timestamp
        calEvent.end_timestamp = end_timestamp
        console.log(calEvent)
        handlePutEvent(calEvent)
    }

    function handleTitleChange(event) {
        setEventTitle(event.target.value)
    }

    function handleAttendeesChange(event) {
        setAttendees(event.target.value)
    }

    function handleDescriptionChange(event) {
        setEventDescription(event.target.value)
    }

    function handleLocationChange(event) {
        setEventLocation(event.target.value)
    }

    function handleLinkChange(event) {
        setEventLink(event.target.value)
    }

    function handleStartChange(event) {
        setEventStart(event.target.value)
    }

    function handleEndChange(event) {
        setEventEnd(event.target.value)
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Event</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Event Title</Form.Label>
                        <Form.Control type="text" placeholder={event.title} onChange={handleTitleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Attendees</Form.Label>
                        <Form.Control type="text" placeholder={event.attendee_list} onChange={handleAttendeesChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder={event.description} onChange={handleDescriptionChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Location</Form.Label>
                        <Form.Control type="text" placeholder={event.location} onChange={handleLocationChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Meeting Link</Form.Label>
                        <Form.Control type="text" placeholder={event.meeting_link} onChange={handleLinkChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Start: {event.start_timestamp} To update select new time:</Form.Label>
                        <Form.Control type="datetime-local"
                                      min="2021-10-12T00:00"
                                      max="2025-01-01T00:00"
                                      onChange={handleStartChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>End: {event.end_timestamp} To update select a new time:</Form.Label>
                        <Form.Control type="datetime-local"
                                      min="2021-10-12T00:00"
                                      max="2025-01-01T00:00"
                                      onChange={handleEndChange}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}