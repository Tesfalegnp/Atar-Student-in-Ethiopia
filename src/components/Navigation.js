import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaHome, FaBook, FaComments, FaUser, FaCog } from 'react-icons/fa';

const Navigation = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Atar Students Association</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/">
              <Nav.Link>
                <FaHome className="me-1" /> Home
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/posts">
              <Nav.Link>
                <FaBook className="me-1" /> Posts
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/chat">
              <Nav.Link>
                <FaComments className="me-1" /> Chat
              </Nav.Link>
            </LinkContainer>
            <NavDropdown title={<><FaUser className="me-1" /> Account</>} id="account-dropdown">
              <LinkContainer to="/account">
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/settings">
                <NavDropdown.Item>Settings</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to="/academic">
                <NavDropdown.Item>Academic Materials</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;