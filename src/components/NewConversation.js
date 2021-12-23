import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Cookies from 'js-cookie'

function NewConversation(props) {
    const navigate = useNavigate()
    const [input, setInput] = useState('')
    const handleChange = (event) => {
        setInput(event.target.value)
    }
    const handleSubmit = () => {
        let body = {
            participants: [
                input
            ]
        }
        const makeAPICall = async() => {
            const res = await fetch(`http://localhost:8000/conversations/create/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${Cookies.get('token')}`
                },
                body: JSON.stringify(body)
            })
            const json = await res.json()
            console.log(json)
            if (res.status === 400) {
                alert(json.non_field_errors[0])
            } else {
                if (window.innerWidth <= 768) {
                    navigate(`../conversation/${json.id}`)
                } else {
                    navigate(`../home/${json.id}`)
                }
            }
        }
        makeAPICall()
        setInput('')
        props.handleClose()
    }
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Conversation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Please enter Friend's Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={input} onChange={handleChange}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NewConversation;