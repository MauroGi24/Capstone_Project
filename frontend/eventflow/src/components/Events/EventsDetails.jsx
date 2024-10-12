import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { eventDetail } from '../../data/fetch';  
import './assets/CSS/CardEvent.css'

function EventDetails() {
  const { id } = useParams();  
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const fetchedEvent = await eventDetail(id);  
        setEvent(fetchedEvent);
      } catch (error) {
        console.error('Errore nel recupero dell\'evento:', error);
      }
    };

    fetchEvent();
  }, [id]);

  return (
    <Container className="event-details-container mt-5">
      <Row>
        <Col md={6}>
          <Image src={event.cover} alt={event.name} fluid className="event-cover-image"/>
        </Col>
        <Col md={6}>
          <h2 className="event-title">{event.name}</h2>
          <p className="event-date">📅 {new Date(event.date).toLocaleDateString()}</p>
          <p className="event-place">📍 {event.place}</p>
          <p className="event-category">🎫 Categoria: {event.category}</p>
          <p className="event-description">{event.description}</p>
          <Button  variant="primary" className="mt-3 animated-button">Registrati</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default EventDetails;
