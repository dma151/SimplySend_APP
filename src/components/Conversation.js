import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import './conversation.css'
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Conversation = () => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const makeAPICall = async () => {
      const res = await fetch("http://localhost:8000/conversations/5/", {
        method: "GET",
        headers: {
          Authorization: `Token ${Cookies.get("token")}`,
        },
      });
      const json = await res.json();
      setMessages(json.messages);
    };
    makeAPICall();
  }, []);

  const chat = messages.map((message) => {
    // getAuthor(message.author)
    return (
      <Row key={message.id}>
        <Col>
          <p>{message.author}</p>
          <Card style={{ width: "10rem" }}>
            <Card.Body>{message.content}</Card.Body>
          </Card>
        </Col>
      </Row>
    );
  });

  const [input, setInput] = useState('')
  const handleChange = (event) => {
    setInput(event.target.value)
  }

  const Send = (event) => {
    const body = {
        content: input,
        conversation: 5
    }
    const makeAPICall = async() => {
        const res = await fetch('http://localhost:8000/messages/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${Cookies.get('token')}`
            },
            body: JSON.stringify(body)
        })
        const json = await res.json()
        setInput('')
    }
    makeAPICall()
  }

  return (
    <div>
      <Container id="chat" fluid>{chat}</Container>
      <Form onSubmit={Send} className="message">
        <Row>
          <Col xs={9} sm={9} lg={9} xl={9}>
            <Form.Group className="mb-3" controlId="formMessage">
              <Form.Control type="message" placeholder="type here" value={input} onChange={handleChange}/>
            </Form.Group>
          </Col>
          <Col xs={2} sm={2} lg={2} xl={2}>
            <Button variant="primary" type="submit">
              Send
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Conversation;



  // Attempt at extracting the author from id that was received,
  // But this will need to be fixed in the back end later

  // const [author, setAuthor] = useState('')
  // const getAuthor = (id) => {
  //     fetch(`http://localhost:8000/get-user/${id}/`, {
  //         method: "GET",
  //         headers: {
  //             Authorization: `Token ${Cookies.get('token')}`
  //         }
  //     }).then(res =>
  //         res.json()
  //     ).then((data) => {
  //         setAuthor(data.email)
  //     }).catch(err => console.log(err))
  // }