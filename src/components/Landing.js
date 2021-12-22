import "./landing.css";
import Cookies from "js-cookie";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import { useNavigate } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate()
  // keeps track of register form input fields
  const [register_user, setRegisterUser] = useState({
    email: "",
    password: "",
  });
  const handleRegisterChange = (event) => {
    setRegisterUser({
      ...register_user,
      [event.target.type]: event.target.value,
    });
    console.log(register_user);
  };
  // keeps track of login form input fields
  const [login_user, setLoginUser] = useState({ email: "", password: "" });
  const handleLoginChange = (event) => {
    setLoginUser({ ...login_user, [event.target.type]: event.target.value });
    console.log(login_user);
  };
  // handleSubmit to Register the new user
  const Register = (event) => {
    event.preventDefault();
    const data = {
      user: {
        email: register_user.email,
        password: register_user.password,
      },
    };
    const makeAPICall = async() => {
      const res = await fetch("http://localhost:8000/sign-up/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.status === 400) {
        if (json.email) {
          alert("email:" + json.email);
        }
        if (json.password) {
          alert("password:" + json.password);
        }
      } else {
        alert("User created!");
        setRegisterUser({ email: "", password: "" });
      }
    };
    makeAPICall();
  };
  // handleSubmit for Logging in User
  const LogIn = (event) => {
    event.preventDefault();
    const data = {
      user: {
        email: login_user.email,
        password: login_user.password
      }
    }
    const makeAPICall = async() => {
      const res = await fetch("http://localhost:8000/sign-in/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      const json = await res.json()
      if (res.status === 422) {
       alert(json.msg)
      } else {
        Cookies.set('token', json.user.token)
        navigate('/home')
      }
    }
    makeAPICall()
  };



  return (
    <Container fluid>
      <Row>
        <Col>
          <Card style={{ width: "18rem" }}>
            <Card.Title>New User?</Card.Title>
            <Card.Body>
              <Form onSubmit={Register}>
                <Form.Group className="mb-3" controlId="formBasicEmailRegister">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={register_user.email}
                    onChange={handleRegisterChange}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="formBasicPasswordRegister"
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={register_user.password}
                    onChange={handleRegisterChange}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Register
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: "18rem" }}>
            <Card.Title>Already Registered?</Card.Title>
            <Card.Body>
              <Form onSubmit={LogIn}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={login_user.email}
                    onChange={handleLoginChange}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={login_user.password}
                    onChange={handleLoginChange}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Log in
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
