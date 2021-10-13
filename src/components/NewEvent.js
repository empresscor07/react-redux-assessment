import {Button, Form, Modal} from "react-bootstrap";
import {useState} from "react";

export default function NewEvent({show, handleClose, handleCreateEvent}) {
    const [title, setEventTitle] = useState('');
    const [attendees, setAttendees] = useState('');
    const [description, setEventDescription] = useState('');
    const [location, setEventLocation] = useState('');
    const [meeting_link, setEventLink] = useState('');
    const [start_timestamp, setEventStart] = useState('');
    const [end_timestamp, setEventEnd] = useState('');

    function handleSubmit(event) {
        event.preventDefault()
        const attendee_list = attendees.split(',')
        handleClose()
        handleCreateEvent({
            attendee_list,
            title,
            description,
            location,
            meeting_link,
            start_timestamp,
            end_timestamp})
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
                <Modal.Title>New Event</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Event Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter an Event title" onChange={handleTitleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Attendees</Form.Label>
                        <Form.Control type="text" placeholder="person, person, ..." onChange={handleAttendeesChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Enter Event Description" onChange={handleDescriptionChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Location</Form.Label>
                        <Form.Control type="text" placeholder="Enter Location of Event" onChange={handleLocationChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Meeting Link</Form.Label>
                        <Form.Control type="text" placeholder="Enter URL for meeting Link" onChange={handleLinkChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Start Time</Form.Label>
                        <Form.Control type="datetime-local"
                                      min="2021-10-12T00:00"
                                      max="2025-01-01T00:00"
                                      onChange={handleStartChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>End Time</Form.Label>
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