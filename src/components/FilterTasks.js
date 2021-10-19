import {Button, Form, Modal} from "react-bootstrap";
import {useState} from "react";

export default function FilterEvents({showTaskFilter, handleFilterTaskClose, handleFilterTasks}) {
    const [window_start, setStartWindow] = useState('');
    const [window_end, setEndWindow] = useState('');

    function handleFilterSubmit(event) {
        event.preventDefault()
        // console.log(window_start, window_end)
        handleFilterTaskClose()
        handleFilterTasks({window_start, window_end})
    }

    function handleStartWindowChange(event) {
        setStartWindow(event.target.value)
        // console.log(` handler ${window_start}`)
    }

    function handleEndWindowChange(event) {
        setEndWindow(event.target.value)
        // console.log(` handler ${window_end}`)
    }
    //console.log(showFilter);
    return (
        <Modal show={showTaskFilter} onHide={handleFilterTaskClose}>
            <Modal.Header closeButton>
                <Modal.Title>Filter Tasks:</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleFilterSubmit}>

                    <Form.Group className="mb-3">
                        <Form.Label>From:</Form.Label>
                        <Form.Control type="datetime-local"
                            // value="2021-10-12T14:30"
                            // min="2021-10-12T00:00"
                            // max="2025-01-01T00:00"
                                      onChange={handleStartWindowChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Until:</Form.Label>
                        <Form.Control type="datetime-local"
                            // value="2021-11-30T15:30"
                            // min="2021-10-12T00:00"
                            // max="2025-01-01T00:00"
                                      onChange={handleEndWindowChange}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        See Tasks
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}