import {Button, Form, Modal} from "react-bootstrap";
import {useState} from "react";

export default function NewRSVP({invite, showRSVP, handleCloseRSVP, handlePostInvite}) {
    const [accepted, setAccepted] = useState(false);
    const [inviteRowCreated, setInviteRowCreated] = useState(false);

    async function handleRadioClick(event) {
        await setAccepted(event.target.value)
    }

    async function handleAcceptedClick() {
            handleCloseRSVP()
            handlePostInvite(invite, accepted)
            await setInviteRowCreated(true)
    }

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
                    <Button variant="primary" onClick={handleAcceptedClick}>
                        Send Response
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}