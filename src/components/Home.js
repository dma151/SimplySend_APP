import { useState, useEffect } from 'react'
import Cookies from "js-cookie"
import Container from 'react-bootstrap/Container'

const Home = () => {
    const [conversations, setConversations] = useState([])
    const [friends, setFriends] = useState([])
    useEffect(()=> {
        const makeAPICall = async() => {
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
        makeAPICall()
    }, [])
    console.log(conversations)
    return(
        <h1>Home</h1>
    )
}

export default Home