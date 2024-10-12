import {useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../page/assets/CSS/style.css'


const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= pageHeight - 100) {
      setIsVisible(true); 
    } else {
      setIsVisible(false); 
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

 return (
    <footer className={`footer-container ${isVisible ? 'visible' : ''}`}>
      <Container>
        <Row>
          <Col md={4} className="footer-column">
            <h5>About Us</h5>
            <p>
              EventFlow è la tua piattaforma per scoprire eventi indimenticabili.
              Trova concerti, arte, sport e altro ancora vicino a te.
            </p>
          </Col>
          <Col md={4} className="footer-column">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#events">Eventi</a></li>
              <li><a href="#about">Chi Siamo</a></li>
              <li><a href="#contact">Contattaci</a></li>
            </ul>
          </Col>
          <Col md={4} className="footer-column">
            <h5>Seguici</h5>
            <ul className="social-icons">
              <li><i className="fab fa-facebook-f"></i></li>
              <li><i className="fab fa-twitter"></i></li>
              <li><i className="fab fa-instagram"></i></li>
              <li><i className="fab fa-linkedin-in"></i></li>
            </ul>
          </Col>
        </Row>
        <Row className="text-center mt-4">
          <Col>
            <p>&copy; {new Date().getFullYear()} EventFlow. Tutti i diritti riservati.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
