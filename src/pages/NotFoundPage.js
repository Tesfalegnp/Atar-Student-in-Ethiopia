import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Container className="text-center py-5">
      <FaExclamationTriangle size={64} className="text-danger mb-4" />
      <h1>404 - Page Not Found</h1>
      <p className="lead">The page you are looking for doesn't exist or has been moved From Tesfa.</p>
      <Link to="/">
        <Button variant="primary" className="mt-3">
          <FaHome className="me-2" /> Go Back Home
        </Button>
      </Link>
    </Container>
  );
};

export default NotFoundPage;