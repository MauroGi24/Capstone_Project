import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate per la navigazione
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { LoginContext } from '../context/LoginContext';
import { login } from "../data/fetch";

function ModalLogin() {
  const { setToken, userInfo, logout } = useContext(LoginContext);
  const [formValue, setFormValue] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(""); 
  const [showAlert, setShowAlert] = useState(false); 
  const navigate = useNavigate(); 
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  const handleChange = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value
    });
  };

  const handleLogin = async () => {
    if (!formValue.email || !formValue.password) {
      setErrorMessage("Per favore, inserisci email e password.");
      setShowAlert(true);
      return;
    }

    try {
      const tokenObj = await login(formValue);
      if (tokenObj && tokenObj.token) {
        localStorage.setItem('token', tokenObj.token);
        setToken(tokenObj.token);
        setShow(false);
        setShowAlert(false);
      } else {
        setErrorMessage("Credenziali errate");
        setShowAlert(true);
      }
    } catch (error) {
      setErrorMessage("Errore, riprova più tardi.");
      setShowAlert(true);
    } 
  };

  useEffect(() => {
    if (userInfo) {
      if (userInfo.role === 'visitor') {
        navigate('/profile');
      } else if (userInfo.role === 'admin') {
        navigate('/admin/dashboard'); 
      } else {
        setErrorMessage("Ruolo non riconosciuto.");
        setShowAlert(true);
      }
    }
  }, [userInfo, navigate])

  const handleLogout = () => {
    logout();  
    navigate('/')
    setShow(false);
  }

  return (
    <>
      <Button className="me-2 mb-2" onClick={() => handleShow(true)}>
        Login
      </Button>
      

      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="justify-content-md-center">
              <Col xs lg='4'>
                {showAlert && (
                  <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                    {errorMessage}
                  </Alert>
                )}
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                      type="email" 
                      name='email' 
                      onChange={handleChange} 
                      placeholder="Inserisci la tua email" 
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                      type="password" 
                      name='password' 
                      onChange={handleChange} 
                      placeholder="Password" 
                    />
                  </Form.Group>

                  <Button 
                    variant="primary" 
                    onClick={handleLogin} 
                    type="button" 
                  >
                    Accedi
                  </Button>
                  <Button 
                    variant="primary" 
                    onClick={handleLogout} 
                    type="button" 
                  >
                    Logout
                  </Button>
                  
                </Form>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalLogin;
