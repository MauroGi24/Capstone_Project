import React from 'react';
import { Button, Card, Col, Row, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './assets/CSS/CardEvent.css'; 

function CardEvent({ events }) {
  return (
    <Container>
      <Row className="g-4">
        {events.map((event) => (
          <Col key={event._id} xs={12} md={6} lg={4} xl={3} className="card-wrapper">
            <Card as={Link} to={`/event-details/${event._id}`} className="event-card h-100 shadow">
              <div className="card-img-container">
                <Card.Img
                  data-testid='card-img'
                  variant="top"
                  src={event.cover}
                  alt={event.title}
                  className="card-img"
                />
              </div>
              <Card.Body className="d-flex flex-column justify-content-between card-body">
                <div>
                  <Card.Title className="fs-6 text-center">{event.name}</Card.Title>
                </div>
                <Button className="w-100 mt-3 animated-button">More Info</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CardEvent;
