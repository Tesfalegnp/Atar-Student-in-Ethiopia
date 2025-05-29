import { Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Spinner, Accordion, ListGroup, Badge } from 'react-bootstrap';
import { FaSearch, FaBook, FaFilePdf, FaUniversity } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const AcademicPage = () => {
  const [universities, setUniversities] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [courses, setCourses] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Ethiopian universities (sample of 45)
  const ethiopianUniversities = [
    "Addis Ababa University",
    "Addis Ababa Science and Technology University",
    "Adama Science and Technology University",
    "Adigrat University",
    "Aksum University",
    "Ambo University",
    "Arba Minch University",
    "Assosa University",
    "Bahir Dar University",
    "Bule Hora University",
    "Debark University",
    "Debre Berhan University",
    "Debre Markos University",
    "Debre Tabor University",
    "Dilla University",
    "Dire Dawa University",
    "Gambella University",
    "Haramaya University",
    "Hawassa University",
    "Injibara University",
    "Jigjiga University",
    "Jimma University",
    "Kebri Dehar University",
    "Madda Walabu University",
    "Mekelle University",
    "Mizan-Tepi University",
    "Semera University",
    "Wachemo University",
    "Wolaita Sodo University",
    "Woldia University",
    "Wollega University",
    "Wollo University",
    "Wolayta Sodo University",
    "Bahr Dar University",
    "Gondar University",
    "Hawassa University",
    "Jinka University",
    "Kotebe Metropolitan University",
    "Mekdela Amba University",
    "Metu University",
    "Mizan University",
    "Nekemte University",
    "Shambu University",
    "Shashemene University",
    "Wolkite University"
  ];

  useEffect(() => {
    setUniversities(ethiopianUniversities.map((uni, index) => ({
      id: index + 1,
      name: uni
    })));
  }, []);

  useEffect(() => {
    if (selectedUniversity) {
      setLoading(true);
      // Simulate API call to get departments
      setTimeout(() => {
        const mockDepartments = [
          { id: 1, name: 'Computer Science' },
          { id: 2, name: 'Electrical Engineering' },
          { id: 3, name: 'Mechanical Engineering' },
          { id: 4, name: 'Civil Engineering' },
          { id: 5, name: 'Medicine' },
          { id: 6, name: 'Law' },
          { id: 7, name: 'Business Administration' }
        ];
        setDepartments(mockDepartments);
        setLoading(false);
      }, 500);
    }
  }, [selectedUniversity]);

  useEffect(() => {
    if (selectedDepartment) {
      setLoading(true);
      // Simulate API call to get courses
      setTimeout(() => {
        const mockCourses = [
          { id: 1, code: 'CS101', name: 'Introduction to Programming' },
          { id: 2, code: 'CS201', name: 'Data Structures' },
          { id: 3, code: 'CS301', name: 'Algorithms' },
          { id: 4, code: 'CS401', name: 'Database Systems' }
        ];
        setCourses(mockCourses);
        setLoading(false);
      }, 500);
    }
  }, [selectedDepartment]);

  useEffect(() => {
    if (selectedDepartment) {
      // Simulate API call to get materials
      setTimeout(() => {
        const mockMaterials = [
          {
            id: 1,
            title: 'Introduction to Programming Lecture Notes',
            type: 'Lecture Notes',
            course: 'CS101',
            year: '2022',
            downloads: 1245,
            fileType: 'pdf'
          },
          {
            id: 2,
            title: 'Data Structures Exam 2015',
            type: 'Exam Paper',
            course: 'CS201',
            year: '2015',
            downloads: 876,
            fileType: 'pdf'
          },
          {
            id: 3,
            title: 'Algorithms Assignment Solutions',
            type: 'Assignment',
            course: 'CS301',
            year: '2021',
            downloads: 543,
            fileType: 'pdf'
          },
          {
            id: 4,
            title: 'Database Systems Project Guidelines',
            type: 'Project',
            course: 'CS401',
            year: '2020',
            downloads: 321,
            fileType: 'docx'
          }
        ];
        setMaterials(mockMaterials.filter(material =>
          material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          material.course.toLowerCase().includes(searchTerm.toLowerCase())
        ));
      }, 300);
    }
  }, [selectedDepartment, searchTerm]);

  const handleDownload = (materialId) => {
    toast.success(`Downloading material ${materialId}`);
    // Actual download logic would go here
  };

  return (
    <Container className="my-4">
      <h2 className="mb-4">Academic Resources</h2>
      
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Header>
              <h5>Select University</h5>
            </Card.Header>
            <Card.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <ListGroup variant="flush">
                {universities.map(university => (
                  <ListGroup.Item
                    key={university.id}
                    action
                    active={selectedUniversity?.id === university.id}
                    onClick={() => setSelectedUniversity(university)}
                    className="d-flex align-items-center"
                  >
                    <FaUniversity className="me-2" />
                    {university.name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>

          {selectedUniversity && (
            <Card className="mb-4">
              <Card.Header>
                <h5>Departments at {selectedUniversity.name}</h5>
              </Card.Header>
              <Card.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {loading ? (
                  <div className="text-center">
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </div>
                ) : (
                  <ListGroup variant="flush">
                    {departments.map(department => (
                      <ListGroup.Item
                        key={department.id}
                        action
                        active={selectedDepartment?.id === department.id}
                        onClick={() => setSelectedDepartment(department)}
                      >
                        {department.name}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </Card.Body>
            </Card>
          )}

          {selectedDepartment && (
            <Card>
              <Card.Header>
                <h5>Courses in {selectedDepartment.name}</h5>
              </Card.Header>
              <Card.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {loading ? (
                  <div className="text-center">
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </div>
                ) : (
                  <Accordion>
                    {courses.map(course => (
                      <Accordion.Item key={course.id} eventKey={course.id}>
                        <Accordion.Header>
                          {course.code} - {course.name}
                        </Accordion.Header>
                        <Accordion.Body className="p-2">
                          <small className="text-muted">Materials available: 4</small>
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                )}
              </Card.Body>
            </Card>
          )}
        </Col>

        <Col md={8}>
          {selectedDepartment ? (
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  Academic Materials for {selectedDepartment.name}
                </h5>
                <div style={{ width: '300px' }}>
                  <Form.Control
                    type="text"
                    placeholder="Search materials..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </Card.Header>
              <Card.Body style={{ minHeight: '600px' }}>
                {materials.length === 0 ? (
                  <div className="text-center py-5">
                    <FaBook size={48} className="mb-3 text-muted" />
                    <h5>No materials found</h5>
                    <p className="text-muted">
                      {searchTerm ? 'Try a different search term' : 'Select a course to view materials'}
                    </p>
                  </div>
                ) : (
                  <ListGroup variant="flush">
                    {materials.map(material => (
                      <ListGroup.Item key={material.id} className="py-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6>{material.title}</h6>
                            <div className="d-flex gap-3">
                              <small className="text-muted">
                                <strong>Course:</strong> {material.course}
                              </small>
                              <small className="text-muted">
                                <strong>Type:</strong> {material.type}
                              </small>
                              <small className="text-muted">
                                <strong>Year:</strong> {material.year}
                              </small>
                            </div>
                          </div>
                          <div className="d-flex align-items-center gap-2">
                            <Badge bg="secondary" pill>
                              {material.downloads} downloads
                            </Badge>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => handleDownload(material.id)}
                            >
                              <FaFilePdf className="me-1" /> Download
                            </Button>
                          </div>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </Card.Body>
            </Card>
          ) : (
            <Card>
              <Card.Body className="text-center py-5">
                <FaUniversity size={48} className="mb-3 text-muted" />
                <h4>Select a university and department to view academic materials</h4>
                <p className="text-muted">
                  Browse through 45 Ethiopian universities and their course materials
                </p>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AcademicPage;