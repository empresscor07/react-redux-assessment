import {Card, CloseButton, Col, Row, Spinner, Badge, Button} from "react-bootstrap";
import {useState, useEffect} from "react";
// import EditEvent from "./EditEvent";
//more possible parameters: handleDeleteTask, deleteTaskPending, handlePutTask
export default function Task({task, handleDeleteTask, deleteTaskPending}) {
    // console.log(event)
    const [deletePending, setDeletePending] = useState(false)
    const [show, setShow] = useState(false);
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

    function onDelete() {
        setDeletePending(true)
        handleDeleteTask(task)
    }

    // function onEdit() {
    //     console.log(event)
    //     // handlePostEvent(event)
    // }

    useEffect(() => {
        if (!deleteTaskPending) {
            setDeletePending(false)
        }
    }, [deleteTaskPending])

    return (
        <Col xs={3} className='my-3'>
            {/*<EditEvent show={show} event={event} handleClose={handleClose} handlePutEvent={handlePutEvent} />*/}
            <Card border='dark'>
                <Card.Body>
                    <Card.Subtitle><Row>
                        <Col>{task_date(task)}</Col>
                        <Col xs='auto'>{deletePending ? <Spinner animation='border' /> : <CloseButton onClick={onDelete}/>}</Col>
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
        </Col>
    )
}