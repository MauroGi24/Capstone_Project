import { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap';

const UpdateUser = ({ showModal, closeModal, userInfo, onUpdateUser }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [cover, setCover] = useState(null);  
  const [coverPreview, setCoverPreview] = useState('');
  const [errorMessage, setErrorMessage] = useState('')  

  useEffect(() => {
    if (userInfo) {
      const combinedName = `${userInfo.name || ''} ${userInfo.surname || ''}`.trim();
      setFullName(combinedName);
      setEmail(userInfo.email || '');
    }
  }, [userInfo]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCover(file);  
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Separa nome e cognome da "fullName"
      const [name, surname] = fullName.split(' ');

      const formData = new FormData();
      formData.append('name', name || '');
      formData.append('surname', surname || '');
      formData.append('email', email);
      if (cover) {
        formData.append('avatar', cover);
      }
      const id = userInfo._id;
      
      const updatedUser = await onUpdateUser(formData, id);
      
      if (updatedUser) {
        setErrorMessage('');  
        closeModal();
      }
    } catch (error) {
      setErrorMessage('Errore durante la modifica del profilo:', error);
    }
  };

  return (
    <Modal show={showModal} onHide={closeModal} className="custom-modal">
      <Modal.Header closeButton className="modal-header-custom">
        <Modal.Title>Modifica Profilo Utente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit} className="form-container-modal">
        {errorMessage && (
            <Alert variant="danger">
              {errorMessage}  
            </Alert>
          )}
          <Row className="mb-3">
            <Form.Group as={Col} sm="12">
              <Form.Label className="form-label">Nome e Cognome</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="form-control"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} sm="12">
              <Form.Label className="form-label">Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-control"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3 form-group">
              <Form.Group as={Col} sm="12">
                <Form.Label className="form-label">Avatar</Form.Label>
                <Form.Control
                  type="file"
                  name="avatar"
                  onChange={handleFileChange}
                  className="form-control"
                />
                {coverPreview && (
                  <div className="mt-2">
                    <img
                      src={coverPreview}
                      alt="Preview"
                      style={{ width: "60px", height: "60px" }}
                    />
                  </div>
                )}
              </Form.Group>
            </Row>
          <div className="text-center">
            <Button variant="primary" type="submit" className="btn-primary">
              Salva modifiche
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateUser;
