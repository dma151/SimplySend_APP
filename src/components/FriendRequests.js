import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./friendrequests.css";

const FriendRequests = () => {
  const [requests, setRequests] = useState([]);
  const [pendingrequests, setPendingRequests] = useState([]);

  useEffect(() => {
    const fetchMyRequests = async () => {
      const res = await fetch(
        "https://simplysendapi.herokuapp.com/friend-requests/",
        {
          method: "GET",
          headers: {
            Authorization: `Token ${Cookies.get("token")}`,
          },
        }
      );
      const json = await res.json();
      console.log(json)
      setRequests(json);
    };
    const fetchPendingRequests = async () => {
      const res = await fetch(
        "https://simplysendapi.herokuapp.com/pending-friend-requests/",
        {
          method: "GET",
          headers: {
            Authorization: `Token ${Cookies.get("token")}`,
          },
        }
      );
      const json = await res.json();
      setPendingRequests(json);
    };
    fetchMyRequests();
    fetchPendingRequests();
  }, []);
  const requestList = requests.map((request) => {
    return (
      <ListGroup.Item key={request.id}>
        <Card style={{ width: "16rem" }}>
          <Card.Body>
            <Card.Title>Request id: {request.id}</Card.Title>
            <Card.Text>from: {request.from_user}</Card.Text>
            <Button variant="primary" onClick={() => handleAccept(request.id)}>Accept</Button>
            <Button variant="danger" onClick={() => handleDeny(request.id)}>Deny</Button>
          </Card.Body>
        </Card>
      </ListGroup.Item>
    );
  });
  const pendingList = pendingrequests.map((pending) => {
    return (
      <ListGroup.Item key={pending.id}>
        <Card style={{ width: "16rem" }}>
          <Card.Body>
            <Card.Title>Request id: {pending.id}</Card.Title>
            <Card.Text>from: {pending.from_user}</Card.Text>
            <Button variant="danger" onClick={() => handleDeny(pending.id)}>Delete</Button>
          </Card.Body>
        </Card>
      </ListGroup.Item>
    );
  });
  const handleAccept = (id) => {
      const makeAPICall = async () => {
          const res = await fetch(`https://simplysendapi.herokuapp.com/accept-friend-request/${id}/`, {
              method: "DELETE",
              headers: {
                  Authorization: `Token ${Cookies.get('token')}`
              }
          })
          const json = await res.json()
      }
      makeAPICall()
  }
  const handleDeny = (id) => {
      const makeAPICall = async () => {
          const res = await fetch(`https://simplysendapi.herokuapp.com/delete-friend-request/${id}/`, {
              method: "DELETE",
              headers: {
                  Authorization: `Token ${Cookies.get('token')}`
              }
          })
          const json = await res.json()
          alert(json)
      }
      makeAPICall()
  }
  return (
    <Container>
      <Row>
        <Col>
          <h3>My Friend Requests</h3>
          <ListGroup>{requestList}</ListGroup>
        </Col>
        <Col>
          <h3>Pending Friend Requests</h3>
          <ListGroup>{pendingList}</ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default FriendRequests;
