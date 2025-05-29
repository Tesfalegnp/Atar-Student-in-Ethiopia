import React, { useState } from 'react';
import { 
  Container, 
  Card, 
  Button, 
  Row, 
  Col, 
  Carousel,
  Form,
  ListGroup,
  Badge
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  FaBook, 
  FaComments, 
  FaUserFriends,
  FaUniversity,
  FaChalkboardTeacher,
  FaFilePdf,
  FaEnvelope,
  FaArrowRight,
  FaStar,
  FaQuoteLeft
} from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';

const WelcomePage = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Add your subscription logic here
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  // Native smooth scroll implementation
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      quote: "This platform helped me find study materials I couldn't access anywhere else. Scored my highest grades thanks to Atar!",
      author: "Meron A., AAU Computer Science"
    },
    {
      id: 2,
      quote: "The discussion forums solved my toughest calculus problems. Connecting with seniors made all the difference.",
      author: "Tewodros K., Bahir Dar Engineering"
    },
    {
      id: 3,
      quote: "Real-time chat helped me form study groups during exam season. Lifesaver for medical students!",
      author: "Selam W., Mekelle University"
    }
  ];

  // Features data
  const features = [
    { icon: <FaUniversity size={40} />, title: "45+ Universities", description: "Resources from all major Ethiopian universities" },
    { icon: <FaBook size={40} />, title: "10,000+ Materials", description: "Lecture notes, past exams, and study guides" },
    { icon: <FaUserFriends size={40} />, title: "50,000+ Students", description: "Active community helping each other succeed" },
    { icon: <FaChalkboardTeacher size={40} />, title: "Expert Tutors", description: "Get help from top students and graduates" }
  ];

  return (
    <div className="welcome-page">
      {/* Hero Section */}
      <section className="hero-section py-5 bg-primary text-white">
        <Container className="py-5">
          <Row className="align-items-center">
            <Col lg={6} className="mb-5 mb-lg-0">
              <h1 className="display-4 fw-bold mb-4">
                Empower Your Academic Journey
              </h1>
              <p className="lead mb-4">
                Join Ethiopia's largest student network for collaborative learning, 
                resource sharing, and academic success.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Button 
                  variant="light" 
                  size="lg"
                  onClick={() => scrollTo('features')}
                >
                  Explore Features <FaArrowRight className="ms-2" />
                </Button>
                <Button 
                  variant="outline-light" 
                  size="lg"
                  onClick={() => scrollTo('join')}
                >
                  Join Now
                </Button>
              </div>
            </Col>
            <Col lg={6}>
              <img 
                src="/assets/hero-image.png" 
                alt="Students collaborating" 
                className="img-fluid rounded shadow"
                style={{ border: '3px solid rgba(255,255,255,0.2)' }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Bar */}
      <section className="stats-bar py-4 bg-dark text-white">
        <Container>
          <Row className="text-center">
            {features.map((feature, index) => (
              <Col md={3} sm={6} key={index} className="mb-3 mb-md-0">
                <div className="d-flex align-items-center justify-content-center">
                  <span className="text-primary me-3">{feature.icon}</span>
                  <div className="text-start">
                    <h3 className="mb-0">{feature.title}</h3>
                    <small>{feature.description}</small>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section id="features" className="py-5">
        <Container>
          <h2 className="text-center mb-5 fw-bold">Why Choose Atar?</h2>
          <Row className="g-4">
            <Col lg={3} md={6}>
              <Card className="h-100 border-0 shadow-sm feature-card">
                <Card.Body className="text-center p-4">
                  <FaBook className="text-primary mb-3" size={48} />
                  <h4>Academic Resources</h4>
                  <p>
                    Access thousands of curated study materials from 45+ Ethiopian universities.
                  </p>
                  <Link to="/academic" className="text-decoration-none">
                    Explore <FaArrowRight />
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={3} md={6}>
              <Card className="h-100 border-0 shadow-sm feature-card">
                <Card.Body className="text-center p-4">
                  <FaComments className="text-primary mb-3" size={48} />
                  <h4>Discussion Forums</h4>
                  <p>
                    Get answers to your questions from students across different universities.
                  </p>
                  <Link to="/posts" className="text-decoration-none">
                    Join Discussions <FaArrowRight />
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={3} md={6}>
              <Card className="h-100 border-0 shadow-sm feature-card">
                <Card.Body className="text-center p-4">
                  <FaUserFriends className="text-primary mb-3" size={48} />
                  <h4>Study Groups</h4>
                  <p>
                    Form virtual study groups with students in your field from any university.
                  </p>
                  <Link to="/chat" className="text-decoration-none">
                    Connect Now <FaArrowRight />
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={3} md={6}>
              <Card className="h-100 border-0 shadow-sm feature-card">
                <Card.Body className="text-center p-4">
                  <FaFilePdf className="text-primary mb-3" size={48} />
                  <h4>Exam Repository</h4>
                  <p>
                    Largest collection of past exam papers with solutions and explanations.
                  </p>
                  <Link to="/academic" className="text-decoration-none">
                    Browse Exams <FaArrowRight />
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* How It Works */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5 fw-bold">How It Works</h2>
          <Row className="g-4">
            <Col md={4}>
              <div className="text-center p-4">
                <div className="step-number mb-3">1</div>
                <h4>Create Account</h4>
                <p>
                  Register with your university email to verify your student status.
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="text-center p-4">
                <div className="step-number mb-3">2</div>
                <h4>Explore Resources</h4>
                <p>
                  Browse materials by university, department, or course code.
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="text-center p-4">
                <div className="step-number mb-3">3</div>
                <h4>Connect & Learn</h4>
                <p>
                  Join discussions, ask questions, and share your knowledge.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-5 fw-bold">What Students Say</h2>
          <Carousel indicators={false} className="testimonial-carousel">
            {testimonials.map(testimonial => (
              <Carousel.Item key={testimonial.id}>
                <div className="text-center px-5">
                  <FaQuoteLeft className="text-primary mb-4" size={32} />
                  <p className="lead mb-4">{testimonial.quote}</p>
                  <div className="d-flex justify-content-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-warning mx-1" />
                    ))}
                  </div>
                  <h5 className="mb-0">{testimonial.author}</h5>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </Container>
      </section>

      {/* Universities Section */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5 fw-bold">Partner Universities</h2>
          <Row className="g-3">
            {[
              "Addis Ababa University", "Bahir Dar University", "Mekelle University",
              "Hawassa University", "Jimma University", "Arba Minch University",
              "Wollega University", "Gondar University", "Adama Science & Technology",
              "Debre Markos University", "Wollo University", "Dilla University"
            ].map((uni, index) => (
              <Col key={index} lg={3} md={4} sm={6}>
                <div className="p-3 bg-white rounded shadow-sm text-center">
                  <FaUniversity className="text-primary me-2" />
                  {uni}
                </div>
              </Col>
            ))}
          </Row>
          <div className="text-center mt-4">
            <Button variant="outline-primary" size="lg">
              View All 45+ Universities
            </Button>
          </div>
        </Container>
      </section>

      {/* Join/Subscribe Section */}
      <section id="join" className="py-5 bg-primary text-white">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <h2 className="fw-bold mb-4">Ready to Boost Your Grades?</h2>
              <p className="lead mb-4">
                Join thousands of Ethiopian students achieving academic excellence together.
              </p>
              <ListGroup variant="flush" className="mb-4">
                <ListGroup.Item className="bg-transparent text-white border-white">
                  <FaArrowRight className="me-2" /> Access exclusive study materials
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent text-white border-white">
                  <FaArrowRight className="me-2" /> Connect with top students
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent text-white border-white">
                  <FaArrowRight className="me-2" /> Get exam tips and strategies
                </ListGroup.Item>
              </ListGroup>
              <Button variant="light" size="lg" as={Link} to="/account">
                Create Free Account
              </Button>
            </Col>
            <Col lg={6}>
              <Card className="border-0 shadow">
                <Card.Body className="p-4">
                  <h4 className="mb-4">Stay Updated</h4>
                  <p className="text-muted mb-4">
                    Subscribe to get notifications about new resources, events, and academic tips.
                  </p>
                  {subscribed ? (
                    <div className="alert alert-success">
                      Thank you for subscribing! You'll hear from us soon.
                    </div>
                  ) : (
                    <Form onSubmit={handleSubscribe}>
                      <Form.Group className="mb-3">
                        <Form.Control
                          type="email"
                          placeholder="Your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </Form.Group>
                      <Button variant="primary" type="submit" className="w-100">
                        Subscribe <FiSend className="ms-2" />
                      </Button>
                    </Form>
                  )}
                  <small className="text-muted d-block mt-3">
                    We respect your privacy. Unsubscribe anytime.
                  </small>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-5">
        <Container className="text-center">
          <h2 className="fw-bold mb-4">Start Your Academic Journey Today</h2>
          <p className="lead mb-5">
            Everything you need to succeed - all in one place.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Button variant="primary" size="lg" as={Link} to="/account">
              Join Now - It's Free
            </Button>
            <Button variant="outline-primary" size="lg" as={Link} to="/academic">
              Browse Resources
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default WelcomePage;