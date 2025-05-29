import React from 'react';
import { Navbar, Nav, Container, NavDropdown, Row, Col } from 'react-bootstrap'; // Added Row and Col here
import { LinkContainer } from 'react-router-bootstrap';
import { FaHome, FaBook, FaComments, FaUser, FaCog, FaGraduationCap } from 'react-icons/fa';
// import logo from 'https://data.textstudio.com/output/sample/animated/9/5/7/5/student-3-5759.gif'; // Make sure you have this image

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 py-4">
      <Container>
        <Row className="text-center text-md-start">
          <Col md={4} className="mb-3">
            <h5>Atar Students Association</h5>
            <p className="text-muted">
              Connecting Ethiopian university students for academic excellence and collaboration.
            </p>
          </Col>
          <Col md={4} className="mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-decoration-none text-muted">Home</a></li>
              <li><a href="/posts" className="text-decoration-none text-muted">Posts</a></li>
              <li><a href="/academic" className="text-decoration-none text-muted">Academic Resources</a></li>
            </ul>
          </Col>
          <Col md={4} className="mb-3">
            <h5>Contact</h5>
            <ul className="list-unstyled text-muted">
              <li>Email: info@atarassociation.com</li>
              <li>Phone: +251 123 456 789</li>
            </ul>
          </Col>
        </Row>
        <hr className="my-4" />
        <div className="text-center">
          <small className="text-muted">
            &copy; {new Date().getFullYear()} Atar Students Association. All rights reserved.
          </small>
        </div>
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
                  src="/assets/logo.gif"  // ✅ Absolute path from public folder
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
                <Nav.Link className="mx-2">
                  <FaHome className="me-1" /> Home
                </Nav.Link>
              </LinkContainer>
              
              <LinkContainer to="/posts">
                <Nav.Link className="mx-2">
                  <FaBook className="me-1" /> Posts
                </Nav.Link>
              </LinkContainer>
              
              <LinkContainer to="/chat">
                <Nav.Link className="mx-2">
                  <FaComments className="me-1" /> Chat
                </Nav.Link>
              </LinkContainer>
              
              <NavDropdown 
                title={<><FaUser className="me-1" /> Account</>} 
                id="account-dropdown"
                className="mx-2"
              >
                <LinkContainer to="/account">
                  <NavDropdown.Item>
                    <FaUser className="me-2" /> Profile
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/settings">
                  <NavDropdown.Item>
                    <FaCog className="me-2" /> Settings
                  </NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <LinkContainer to="/academic">
                  <NavDropdown.Item>
                    <FaGraduationCap className="me-2" /> Academic
                  </NavDropdown.Item>
                </LinkContainer>
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