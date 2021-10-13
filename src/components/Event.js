import {Card, CloseButton, Col, Row, Spinner} from "react-bootstrap";
import {useState, useEffect} from "react";

export default function Event({event, handleDeleteEvent, deleteEventPending}) {

    const [deletePending, setDeletePending] = useState(false)
    function event_date(event) {
        const date = new Date(event.start_timestamp);
        return date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear()
    }

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
        <Card>
            <Card.Body>
                <Card.Subtitle><Row>
                    <Col>{event_date(event)}</Col>
                    <Col xs='auto'>{deletePending ? <Spinner animation='border' /> : <CloseButton onClick={onDelete}/>}</Col>
                </Row></Card.Subtitle>
                <Card.Text>{event.title}</Card.Text>
            </Card.Body>
            {/*{*/}
            {/*    tags.length > 0 &&*/}
            {/*    <Card.Footer><Row>*/}
            {/*        {tags.map((tag, idx) => <Col xs='auto' key={idx}><Badge>{tag}</Badge></Col>)}*/}
            {/*    </Row></Card.Footer>*/}
            {/*}*/}
        </Card>
    </Col>)
}