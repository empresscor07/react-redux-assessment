import {Button, Form, Modal} from "react-bootstrap";
import {useState} from "react";

export default function NewTask({showNewTask, handleCloseNewTask, handlePostTask}) {
    const [title, setTaskTitle] = useState('');
    const [steps, setStepList] = useState('');
    const [timestamp, setTimestamp] = useState('');

    function handleSubmit(event) {
        event.preventDefault()
        const step_list = steps.split(',')
        handleCloseNewTask()
        handlePostTask({
            step_list,
            title,
            timestamp})
    }

    function handleTitleChange(event) {
        setTaskTitle(event.target.value)
    }

    function handleStepsChange(event) {
        setStepList(event.target.value)
    }

    function handleTimeChange(event) {
        setTimestamp(event.target.value)
    }



    return (
        <Modal show={showNewTask} onHide={handleCloseNewTask}>
            <Modal.Header closeButton>
                <Modal.Title>New Task</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Task Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter your task title ..." onChange={handleTitleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Steps</Form.Label>
                        <Form.Control type="text" placeholder="Step 1,Step 2, ... (no spaces next to commas!)" onChange={handleStepsChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>On what day would you like this task to appear?</Form.Label>
                        <Form.Control type="datetime-local"
                                      min="2021-10-12T00:00"
                                      max="2025-01-01T00:00"
                                      onChange={handleTimeChange}
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