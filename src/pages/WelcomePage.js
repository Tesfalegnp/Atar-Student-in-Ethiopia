import React from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <Container>
      <Card className="text-center mt-5 p-4 bg-light border-0 shadow-sm">
        <Card.Body>
          <h1>Welcome to Atar Students Association</h1>
          <p className="lead">
            Connecting Ethiopian university students for academic and social collaboration
          </p>
          <hr className="my-4" />
          <p>
            Join our community to access academic resources, connect with peers, and share knowledge.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/posts">
              <Button variant="primary" size="lg">
                Explore Posts
              </Button>
            </Link>
            <Link to="/academic">
              <Button variant="success" size="lg">
                Academic Resources
              </Button>
            </Link>
          </div>
        </Card.Body>
      </Card>

      <Row className="mt-5">
        <Col md={4} className="text-center">
          <h3>Academic Materials</h3>
          <p>Access reading materials and exam papers from 45 Ethiopian universities.</p>
        </Col>
        <Col md={4} className="text-center">
          <h3>Community Posts</h3>
          <p>Share knowledge, ask questions, and engage with fellow students.</p>
        </Col>
        <Col md={4} className="text-center">
          <h3>Real-time Chat</h3>
          <p>Connect with individuals or groups for academic discussions.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default WelcomePage;