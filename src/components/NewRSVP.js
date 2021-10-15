import {Button, Form, Modal} from "react-bootstrap";
import {useState} from "react";

export default function NewRSVP({invite, showRSVP, handleCloseRSVP, handlePostInvite}) {
    const [accepted, setAccepted] = useState(false);
    const [currentEvent, setCurrentEvent] = useState({});
    const [alreadyClicked, setAlreadyClicked] = useState(false);

    async function handleRadioClick(event) {
        await setAccepted(event.target.value)
    }

    async function handleAcceptedClick() {
        handleCloseRSVP()
        handlePostInvite(invite, accepted)
        await setAlreadyClicked(true)
    }

    function handleAcceptedUpdatedClick() {
        handleCloseRSVP()
        console.log('RSVP updated!')
        // handlePostInvite(invite, accepted)
        // await setCurrentEvent(invite)

    }

    //do some stuff

    return (
        <Modal show={showRSVP} onHide={handleCloseRSVP}>
            <Modal.Header closeButton>
                <Modal.Title>Will you be attending?</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>


                    <Form.Group className="mb-3">
                        <Form.Check
                            onClick={handleRadioClick}
                            type='radio'
                            name='accept'
                            id='yes'
                            label='Yes'
                            value='true'
                        />
                        <Form.Check
                            onClick={handleRadioClick}
                            type='radio'
                            name='accept'
                            id='no'
                            label='No'
                            value='false'
                        />
                    </Form.Group>
                    {
                        !alreadyClicked ?
                            <Button variant="primary" onClick={handleAcceptedClick}>Send RSVP</Button> :
                            <Button variant="success" onClick={handleAcceptedUpdatedClick}>Update RSVP</Button>
                    }
                </Form>
            </Modal.Body>
        </Modal>
    )
}