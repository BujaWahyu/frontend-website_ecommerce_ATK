import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', { email, password });
      const user = response.data;

      // Example: Check if user is admin
      if (user.admin) {
        onLogin(true); // Set isAdmin to true
        navigate('/admin'); // Redirect to admin page
      } else {
        onLogin(false); // Set isAdmin to false
        navigate('/'); // Redirect to customer page
      }
    } catch (error) {
      console.error('Login failed', error);
      alert('Login failed, please check your credentials.');
    }
  };

  return (
    <div style={{ border: '1px solid black', height: '80vh', width: '35vw', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', backgroundColor: 'white' }}>
      <Container>
        <Row lg={1}>
          <Col className="text-center" style={{ fontFamily: 'Vibur, cursive', fontSize: '40px', fontWeight: '600' }}>
            <span>Log In</span>
          </Col>
          <Col className="text-center">
            <span style={{ fontFamily: 'Vibur, cursive', fontSize: '15px' }}>Login using Email and Password</span>
          </Col>
          <Col className="pt-5">
            <InputGroup>
              <Form.Control
                type="email"
                style={{ backgroundColor: '#D9D9D9' }}
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col className="pt-4">
            <InputGroup>
              <Form.Control
                type="password"
                style={{ backgroundColor: '#D9D9D9' }}
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col className="text-center pt-5">
            <Button variant="outline-primary" onClick={handleLogin}>
              Log In
            </Button>
          </Col>
          <Col className="pt-5">
            <Row lg={2}>
              <Col className="text-center">
                <a href="#">Forgot Password?</a>
              </Col>
              <Col className="text-center">
                <Button onClick={() => navigate("/registrasi")} style={{ backgroundColor: '#B8F2E6', borderColor: '#B8F2E6', color: 'black' }}> Create New Account</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
