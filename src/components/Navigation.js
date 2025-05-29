import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { 
  FaHome, 
  FaBook, 
  FaComments, 
  FaUser, 
  FaCog, 
  FaGraduationCap,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaYoutube
} from 'react-icons/fa';

// Color gradients for animation
const colorGradients = [
  'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',  // Deep blue
  'linear-gradient(135deg, #16213e 0%, #0f3460 100%)',  // Darker blue
  'linear-gradient(135deg, #0f3460 0%, #53346d 100%)',  // Blue to purple
  'linear-gradient(135deg, #53346d 0%, #1a1a2e 100%)'   // Purple to deep blue
];

// Footer Component with animated background
const Footer = () => {
  const [currentGradient, setCurrentGradient] = useState(0);
  const [bgStyle, setBgStyle] = useState({
    background: colorGradients[0],
    transition: 'background 8s ease'
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGradient(prev => (prev + 1) % colorGradients.length);
      setBgStyle({
        background: colorGradients[(currentGradient + 1) % colorGradients.length],
        transition: 'background 8s ease'
      });
    }, 8000); // Change every 8 seconds

    return () => clearInterval(interval);
  }, [currentGradient]);

  return (
    <footer className="text-white mt-5" style={bgStyle}>
      <Container className="pt-4">
        <Row className="text-center text-md-start">
          {/* About Section */}
          <Col lg={3} md={6} className="mb-4">
            <div className="d-flex align-items-center mb-3">
              <img
                src="/assets/logo.gif"
                width="60"
                height="60"
                className="me-2"
                alt="Atar Logo"
              />
              <h5 className="mb-0" style={{ color: '#4e9af1' }}>Atar Students</h5>
            </div>
            <p className="text-white small">
             <a>Empowering Ethiopian university students through academic resources, networking, and collaborative learning.</a> 
            </p>
            <div className="social-icons mt-3">
              <a href="https://facebook.com" className="text-white me-3 hover-primary"><FaFacebook size={20} /></a>
              <a href="https://twitter.com" className="text-white me-3 hover-primary"><FaTwitter size={20} /></a>
              <a href="https://linkedin.com" className="text-white me-3 hover-primary"><FaLinkedin size={20} /></a>
              <a href="https://instagram.com" className="text-white me-3 hover-primary"><FaInstagram size={20} /></a>
              <a href="https://youtube.com" className="text-white hover-primary"><FaYoutube size={20} /></a>
            </div>
          </Col>

          {/* Quick Links */}
          <Col lg={3} md={6} className="mb-4">
            <h5 className="text-uppercase mb-4" style={{ color: '#4e9af1' }}>Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <LinkContainer to="/">
                  <a className="text-decoration-none text-white hover-primary">Home</a>
                </LinkContainer>
              </li>
              <li className="mb-2">
                <LinkContainer to="/posts">
                  <a className="text-decoration-none text-white hover-primary">Discussion Forum</a>
                </LinkContainer>
              </li>
              <li className="mb-2">
                <LinkContainer to="/academic">
                  <a className="text-decoration-none text-white hover-primary">Study Materials</a>
                </LinkContainer>
              </li>
              <li className="mb-2">
                <LinkContainer to="/chat">
                  <a className="text-decoration-none text-white hover-primary">Student Chat</a>
                </LinkContainer>
              </li>
              <li>
                <LinkContainer to="/account">
                  <a className="text-decoration-none text-white hover-primary">My Account</a>
                </LinkContainer>
              </li>
            </ul>
          </Col>

          {/* Universities */}
          <Col lg={3} md={6} className="mb-4">
            <h5 className="text-uppercase mb-4" style={{ color: '#4e9af1' }}>Partner Universities</h5>
            <ul className="list-unstyled text-white small">
              <li className="mb-2">Addis Ababa University</li>
              <li className="mb-2">Bahir Dar University</li>
              <li className="mb-2">Mekelle University</li>
              <li className="mb-2">Hawassa University</li>
              <li className="mb-2">Jimma University</li>
              <li>And 40+ more institutions</li>
            </ul>
          </Col>

          {/* Contact Info */}
          <Col lg={3} md={6} className="mb-4">
            <h5 className="text-uppercase mb-4" style={{ color: '#4e9af1' }}>Contact Us</h5>
            <ul className="list-unstyled text-white">
              <li className="mb-3 d-flex align-items-center">
                <FaMapMarkerAlt className="me-2" />
                <span>Addis Ababa, Ethiopia</span>
              </li>
              <li className="mb-3 d-flex align-items-center">
                <FaEnvelope className="me-2" />
                <a href="mailto:info@atarstudents.org" className="text-decoration-none text-white hover-primary">
                  peterhope935@gmail.com
                </a>
              </li>
              <li className="mb-3 d-flex align-items-center">
                <FaPhone className="me-2" />
                <span>+251 916 225 824</span>
              </li>
              <li className="d-flex align-items-center">
                <FaEnvelope className="me-2" />
                <a href="mailto:support@atarstudents.org" className="text-decoration-none text-white hover-primary">
                  nyokbiliu@gmail.com
                </a>
              </li>
            </ul>
          </Col>
        </Row>

        <hr className="my-4 bg-light opacity-25" />

        {/* Copyright and Links */}
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start">
            <small className="text-white">
              &copy; {new Date().getFullYear()} Atar Students Association. All rights reserved.
            </small>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <small className="d-block d-md-inline">
              <a href="/privacy" className="text-decoration-none text-white me-3 hover-primary">Privacy Policy</a>
              <a href="/terms" className="text-decoration-none text-white me-3 hover-primary">Terms of Service</a>
              <a href="/faq" className="text-decoration-none text-white hover-primary">FAQs</a>
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

const Navigation = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect className="shadow-sm">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="d-flex align-items-center">
              <img
                src="/assets/logo.gif"
                width="90"
                height="40"
                className="d-inline-block align-top me-2"
                alt="Atar Logo"
              />
              <span className="fw-bold" style={{ color: '#4e9af1' }}>Atar Students</span>
            </Navbar.Brand>
          </LinkContainer>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/">
                <Nav.Link className="mx-2 hover-primary">
                  <FaHome className="me-1" /> Home
                </Nav.Link>
              </LinkContainer>
              
              <LinkContainer to="/posts">
                <Nav.Link className="mx-2 hover-primary">
                  <FaBook className="me-1" /> Forum
                </Nav.Link>
              </LinkContainer>
              
              <LinkContainer to="/chat">
                <Nav.Link className="mx-2 hover-primary">
                  <FaComments className="me-1" /> Chat
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/academic">
                <Nav.Link className="mx-2 hover-primary">
                  <FaGraduationCap className="me-1" /> Resources
                </Nav.Link>
              </LinkContainer>
              
              <NavDropdown 
                title={<><FaUser className="me-1" /> Account</>} 
                id="account-dropdown"
                className="mx-2"
              >
                <LinkContainer to="/account">
                  <NavDropdown.Item className="hover-primary">
                    <FaUser className="me-2" /> Profile
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/settings">
                  <NavDropdown.Item className="hover-primary">
                    <FaCog className="me-2" /> Settings
                  </NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <NavDropdown.Item href="https://portal.aau.edu.et/" className="hover-primary">
                  <FaGraduationCap className="me-2" /> University Portal
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
export { Footer };