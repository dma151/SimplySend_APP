import "./App.css";
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {Routes, Route, useNavigate } from 'react-router-dom'
import Landing from "../components/Landing";
import Home from "../components/Home"
import Button from 'react-bootstrap/Button'
import Cookies from "js-cookie"
import Conversation from "../components/Conversation";

function App() {
  const navigate = useNavigate()
  const handleClick = () => {
    const makeAPICall = async() => {
      const res = await fetch('http://localhost:8000/sign-out/', {
        method: "DELETE",
        headers: {
          Authorization: `Token ${Cookies.get('token')}`
        }
      })
      navigate('/')
      Cookies.remove('token')
    }
    makeAPICall()
  }
  const homeFunction = () => {
    console.log(Cookies.get('token'))
    if (Cookies.get('token')) {
      navigate('/home')
    }
  }
  return (
    <div className="App">
      <header>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand onClick={homeFunction}>SimplySend</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
              </Nav>
                <Button onClick={handleClick}>Sign Out</Button>
              <Nav>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />}>
          <Route path=':id' element={<Conversation />} />
        </Route>
        <Route path='/conversation/:id' element={<Conversation />} />
      </Routes>
    </div>
  );
}

export default App;