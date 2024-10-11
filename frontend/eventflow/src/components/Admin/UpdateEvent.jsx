import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import "./assets/css/ModalUpdate.css";

const UpdateEvent = ({ show, handleClose, eventData, onUpdateEvent }) => {
  const [formData, setFormData] = useState(eventData);
  const [coverPreview, setCoverPreview] = useState(null);
  const [loading, setLoading] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        cover: file,
      });
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      await onUpdateEvent(formData); 
      handleClose(); 
    } catch (error) {
      console.error("Errore durante la modifica dell'evento:", error);
    } 
      setLoading(false);
  };

  return (
    <>
      {loading && (
        <div className="loader-overlay-modal">
          <div className="loader-modal"></div>
        </div>
      )}
      <Modal show={show} onHide={handleClose} className="custom-modal">
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title>Modifica Evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit} className="form-container-modal">
            <Row className="mb-3 form-group">
              <Form.Group as={Col} sm="12">
                <Form.Label className="form-label">Nome</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </Form.Group>
            </Row>

            <Row className="mb-3 form-group">
              <Form.Group as={Col} sm="12">
                <Form.Label className="form-label">Descrizione</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </Form.Group>
            </Row>

            <Row className="mb-3 form-group">
              <Form.Group as={Col} sm="12">
                <Form.Label className="form-label">Data</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  onChange={handleChange}
                  value={formData.date}
                  required
                  className="form-control"
                />
              </Form.Group>
            </Row>

            <Row className="mb-3 form-group">
              <Form.Group as={Col} sm="12">
                <Form.Label className="form-label">Luogo</Form.Label>
                <Form.Control
                  type="text"
                  name="place"
                  value={formData.place}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </Form.Group>
            </Row>

            <Row className="mb-3 form-group">
              <Form.Group as={Col} sm="12">
                <Form.Label className="form-label">Categoria</Form.Label>
                <Form.Control
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </Form.Group>
            </Row>

            <Row className="mb-3 form-group">
              <Form.Group as={Col} sm="12">
                <Form.Label className="form-label">Cover</Form.Label>
                <Form.Control
                  type="file"
                  name="cover"
                  onChange={handleFileChange}
                  className="form-control"
                />
                {coverPreview && (
                  <div className="mt-2">
                    <img
                      src={coverPreview}
                      alt="Preview"
                      style={{ width: "100px", height: "60px" }}
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
    </>
  );
};

export default UpdateEvent;
