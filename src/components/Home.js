import { useState, useEffect } from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";
import React from "react";
import Cookies from "js-cookie";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import FriendRequest from "./FriendRequest";
import NewConversation from "./NewConversation";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    const getConvosCall = async () => {
      const res = await fetch("https://simplysendapi.herokuapp.com/conversations/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Cookies.get("token")}`,
        },
      });
      const json = await res.json();
      setConversations(json);
    };
    const getFriendsCall = async () => {
      const res = await fetch("https://simplysendapi.herokuapp.com/friends/", {
        method: "GET",
        headers: {
          Authorization: `Token ${Cookies.get("token")}`,
        },
      });
      const json = await res.json();
      setFriends(json.friends);
    };
    getConvosCall();
    getFriendsCall();
  }, []);
  const handleClick = (id) => {
    if (window.innerWidth <= 768) {
      navigate(`../conversation/${id}`);
    } else {
      navigate(`${id}`);
    }
  };
  const conversationList = conversations.map((convo) => {
    if (convo.participants.length > 2) {
      return (
        <ListGroup.Item key={convo.id} onClick={() => handleClick(convo.id)}>
          {convo.participants[0]} + others
        </ListGroup.Item>
      );
    } else {
      return (
        <ListGroup.Item key={convo.id} onClick={() => handleClick(convo.id)}>
          {convo.participants[0]}
        </ListGroup.Item>
      );
    }
  });
  const friendsList = friends.map((friend) => {
    return <ListGroup.Item key={friend}>{friend}</ListGroup.Item>;
  });
  // Friend Request Modal
  const [showFriend, setShowFriend] = useState(false);
  const handleFriendClose = () => setShowFriend(false);
  const handleFriendShow = () => setShowFriend(true);
  // New Conversation Modal
  const [showConvo, setShowConvo] = useState(false);
  const handleConvoClose = () => setShowConvo(false);
  const handleConvoShow = () => setShowConvo(true);

  return (
    <Container fluid className="pageContainer">
      <FriendRequest
        show={showFriend}
        handleClose={handleFriendClose}
        handleShow={handleFriendShow}
      />
      <NewConversation
        show={showConvo}
        handleClose={handleConvoClose}
        handleShow={handleConvoShow}
      />
      <Row>
        <Col md={3} lg={3}>
          <h3>Conversations</h3>
          <Button onClick={handleConvoShow}>New Message</Button>
          <ListGroup>{conversationList}</ListGroup>
        </Col>
        <Col md={6} lg={6} className="convo">
          <Outlet />
        </Col>
        <Col md={3} lg={3}>
          <h3>Friends           <Link to='../friend-requests'>Requests</Link></h3>
          <Button onClick={handleFriendShow}>Add friend</Button>
          <ListGroup>{friendsList}</ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;

// Code I originally had to change user id objects into usernames
// However, that is something I plan to change in the back end

//   const [email, setEmail] = useState("");
//   const makeAPICall = async(id) => {
//       const res = await fetch(`http://localhost:8000/get-user/${id}`, {
//           method: "GET",
//           headers: {
//               Authorization: `Token ${Cookies.get('token')}`
//           }
//       })
//       const json = await res.json()
//       setEmail(json.email)
//   }
