import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { LoginContext } from "../../context/LoginContext";
import { login } from "../../data/fetch";

function ModalLogin() {
  const {token, setToken } = useContext(LoginContext);
  const [formValue, setFormValue] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  const handleChange = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
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
        localStorage.setItem("token", tokenObj.token);
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

  return (
    <>
      {!token && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => handleShow(true)}
          id="icons"
          viewBox="0 0 64 64"
          width="24"
          height="24"
          fill="currentColor"
        >
          <path d="M40.82,29.73a13.55,13.55,0,0,0,4.77-10.31V17.58a13.59,13.59,0,0,0-27.17,0v1.83a13.55,13.55,0,0,0,4.77,10.31A19.39,19.39,0,0,0,9,48.38V55a2,2,0,0,0,2,2H53a2,2,0,0,0,2-2V48.38A19.39,19.39,0,0,0,40.82,29.73ZM22.41,17.58a9.59,9.59,0,0,1,19.17,0v1.83a9.59,9.59,0,0,1-19.17,0ZM51,53H13V48.38A15.39,15.39,0,0,1,28.38,33h7.25A15.39,15.39,0,0,1,51,48.38Z" />
        </svg>
      )}
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="justify-content-md-center">
              <Col xs lg="4">
                {showAlert && (
                  <Alert
                    variant="danger"
                    onClose={() => setShowAlert(false)}
                    dismissible
                  >
                    {errorMessage}
                  </Alert>
                )}
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      onChange={handleChange}
                      placeholder="Inserisci la tua email"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      onChange={handleChange}
                      placeholder="Password"
                    />
                  </Form.Group>

                  <Button variant="primary" onClick={handleLogin} type="button">
                    Accedi
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