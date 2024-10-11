import { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import './assets/css/ModalUpdate.css'

const UpdateRegistration = ({ show, handleClose, reservationData, onUpdateRegistration }) => {
  // Usa stati separati per i campi annidati
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
 
  useEffect(() => {
    if (reservationData) {
        const combinedName = `${reservationData.userId.name || ''} ${reservationData.userId.surname || ''}`.trim();
        setFullName(combinedName);
      setEmail(reservationData.userId.email || '');
    }
  }, [reservationData]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
        const [name, surname] = fullName.split(' '); 
        const updatedData = {
          ...reservationData,
          userId: {
            ...reservationData.userId,
            name: name || '', 
            surname: surname || '', 
            email: email,
          },
        };
      
      await onUpdateRegistration(updatedData); 
      handleClose(); 
    } catch (error) {
      console.error('Errore durante la modifica della prenotazione:', error);
    }
  };
  return (
    <Modal show={show} onHide={handleClose} className="custom-modal">
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title>Modifica Prenotazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit} className="form-container-modal">
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
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-control"
                />
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

export default UpdateRegistration;
