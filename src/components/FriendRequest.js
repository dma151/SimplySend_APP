import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Cookies from "js-cookie";

function FriendRequest(props) {
  const [input, setInput] = useState("");
  const handleChange = (event) => {
    setInput(event.target.value);
  };
  const handleSubmit = () => {
    const makeAPICall = async () => {
      const res = await fetch(
        `http://localhost:8000/make-friend-request/${input}/`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${Cookies.get("token")}`,
          },
        }
      );
      const json = await res.json();
      alert(json);
    };
    makeAPICall();
    setInput("");
    props.handleClose();
  };
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Friend</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Please enter Friend's Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={input}
                onChange={handleChange}
              />
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

export default FriendRequest;
