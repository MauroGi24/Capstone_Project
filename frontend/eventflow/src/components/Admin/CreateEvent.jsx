import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import './assets/css/CreateEvent.css'

const CreateEvent = ({ onAddEvent }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    place: '',
    category: '',
    cover: null,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      cover: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onAddEvent(formData); 
      setFormData({ name: '', description: '', date: '', place: '', category: '', cover: null });
      setError('');
    } catch (err) {
      setError('Errore durante la creazione dell\'evento');
    } 
      setLoading(false); 
  };


  return (
    <>
    {loading && (
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      )}
    <Container className="form-container">
      <h3 className="text-center mb-4">Crea un nuovo evento</h3>
      {error && <div className="text-danger mb-3">{error}</div>}
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} sm="12" className="form-group">
            <Form.Label className="form-label">Nome evento</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Inserisci il nome dell'evento"
              className="form-control"
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} sm="12" className="form-group">
            <Form.Label className="form-label">Descrizione</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Inserisci la descrizione"
              className="form-control"
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} sm="12" className="form-group">
            <Form.Label className="form-label">Data</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="form-control"
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} sm="12" className="form-group">
            <Form.Label className="form-label">Luogo</Form.Label>
            <Form.Control
              type="text"
              name="place"
              value={formData.place}
              onChange={handleChange}
              placeholder="Inserisci il luogo"
              className="form-control"
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} sm="12" className="form-group">
            <Form.Label className="form-label">Categoria</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Inserisci la categoria"
              className="form-control"
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} sm="12" className="form-group">
            <Form.Label className="form-label">Cover</Form.Label>
            <Form.Control
              type="file"
              name="cover"
              onChange={handleFileChange}
              className="form-control"
              required
            />
          </Form.Group>
        </Row>

        <div className="text-center">
          <Button variant="primary" type="submit" className="btn-primary">Crea evento</Button>
        </div>
      </Form>
    </Container>
    </>
  );
};

export default CreateEvent;
