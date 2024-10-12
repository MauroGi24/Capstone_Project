  import { useState, useContext } from "react";
  import { Container, Row, Col, Alert, Button, Modal, Form } from "react-bootstrap";
  import { LoginContext } from "../../context/LoginContext";
  import { login, registerUser } from "../../data/fetch";


  function ModalLogin() {
    const { token, setToken } = useContext(LoginContext);
    const [formValue, setFormValue] = useState({ email: "", password: "" });
    const [registerFormValue, setRegisterFormValue] = useState({
      name: "",
      surname: "",
      email: "",
      password: "",
      birthDate: "",
      profileImage: null,
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [loading, setLoading] = useState(false)
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

    const handleRegisterChange = (event) => {
      const { name, value } = event.target;
      setRegisterFormValue({
        ...registerFormValue,
        [name]: value 
      });
    };

    const handleFileChange = (e) => {
      setRegisterFormValue({
        ...registerFormValue,
        profileImage: e.target.files[0], 
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

    const handleRegister = async () => {
      if (!registerFormValue.name || !registerFormValue.surname || !registerFormValue.email || !registerFormValue.password || !registerFormValue.birthDate) {
        setErrorMessage("Per favore, compila tutti i campi richiesti.");
        setShowAlert(true);
        return;
      }
      setLoading(true)
      const formData = new FormData();
      formData.append("name", registerFormValue.name);
      formData.append("surname", registerFormValue.surname);
      formData.append("email", registerFormValue.email);
      formData.append("password", registerFormValue.password);
      formData.append("birthDate", registerFormValue.birthDate);
      if (registerFormValue.profileImage) {
        formData.append("avatar", registerFormValue.avatar);
      }

      try {
        const result = await registerUser(formData);
        if (result) {
          setShow(false);
          setLoading(false)
          setShowAlert(false);
          // Fare il login automatico dopo la registrazione
          setToken(result.token); 
          localStorage.setItem("token", result.token);
        }
      } catch (error) {
        setErrorMessage(error.message || "Errore durante la registrazione.");
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
        <Modal
          show={show}
          fullscreen={fullscreen}
          onHide={() => setShow(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Login / Registrazione</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              {showAlert && (
                <Alert
                  variant="danger"
                  onClose={() => setShowAlert(false)}
                  dismissible
                >
                  {errorMessage}
                </Alert>
              )}
              <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                  <h4>Login</h4>
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

                    <Button
                      className="button-modal-login"
                      variant="primary"
                      onClick={handleLogin}
                      type="button"
                    >
                      Accedi
                    </Button>
                  </Form>
                </Col>
                <Col xs={12} md={6}>
                  {loading && (
                    <div className="loader-overlay">
                      <div className="loader"></div>
                    </div>
                  )}
                  <h4>Registrazione</h4>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Nome</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="Inserisci il tuo nome"
                        onChange={handleRegisterChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Cognome</Form.Label>
                      <Form.Control
                        type="text"
                        name="surname"
                        placeholder="Inserisci il tuo cognome"
                        onChange={handleRegisterChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Inserisci la tua email"
                        onChange={handleRegisterChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Inserisci la tua password"
                        onChange={handleRegisterChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Data di nascita</Form.Label>
                      <Form.Control
                        type="date"
                        name="birthDate"
                        onChange={handleRegisterChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Immagine del profilo</Form.Label>
                      <Form.Control
                        type="file"
                        name="avatar"
                        onChange={handleFileChange}
                      />
                    </Form.Group>

                    <Button
                      className="button-modal-login"
                      variant="success"
                      onClick={handleRegister}
                      type="button"
                    >
                      Registrati
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
