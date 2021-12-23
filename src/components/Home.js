import { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Cookies from "js-cookie"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import { ListGroupItem } from 'react-bootstrap'
import './home.css'

const Home = () => {
    const navigate = useNavigate()
    const [conversations, setConversations] = useState([])
    const [friends, setFriends] = useState([])
    useEffect(()=> {
        const getConvosCall = async() => {
            const res = await fetch('http://localhost:8000/conversations/', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${Cookies.get('token')}`
                }
            })
            const json = await res.json()
            setConversations(json)
        }
        const getFriendsCall = async() => {
            const res = await fetch('http://localhost:8000/friends/', {
                method: "GET",
                headers: {
                    Authorization: `Token ${Cookies.get('token')}`
                }
            })
            const json = await res.json()
            setFriends(json.friends)
        }
        getConvosCall()
        getFriendsCall()
    }, [])
    const handleClick = (id) => {
        setConversationID(id)
        if (window.innerWidth <= 768) {
            navigate(`../conversation/${id}`)
        } else {
            navigate(`${id}`)
        }
    }
    const conversationList = conversations.map((convo) => {
        if (convo.participants.length > 2) {
            return <ListGroupItem key={convo.id} onClick={() => handleClick(convo.id)}>{convo.participants[0]} + others</ListGroupItem>
        } else {
            return <ListGroupItem key={convo.id} onClick={() => handleClick(convo.id)}>{convo.participants[0]}</ListGroupItem>
        }
    })
    const [email, setEmail] = useState('')
    const friendsList = friends.map((friend) => {
        fetch(`http://localhost:8000/get-user/${friend}/`, {
            method: "GET",
            headers: {
                Authorization: `Token ${Cookies.get('token')}`
            }
        }).then(res => 
                res.json()
            ).then((data) => {
                setEmail(data.email)
            })
            return <ListGroupItem key={friend}>{email}</ListGroupItem>
    })
    const [conversationID, setConversationID] = useState()
    return(
        <Container fluid className='pageContainer'>
            <Row>
                <Col lg={2}>
                    <h3>Conversations</h3>
                    <ListGroup>
                        {conversationList}
                    </ListGroup>
                </Col>
                <Col lg={8}>
                    <Outlet />
                </Col>
                <Col lg={2}>
                    <h3>Friends</h3>
                    <ListGroup>
                        {friendsList}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    )
}

export default Home