import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Row, Col, Alert, Spinner, Image } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaUniversity, FaEdit, FaSave, FaLock } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const AccountPage = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    university: 'Addis Ababa University',
    department: 'Computer Science',
    year: '3rd Year',
    bio: 'Passionate student interested in software development and data science.'
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('https://via.placeholder.com/150');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Profile updated successfully');
      setEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Password changed successfully');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setShowPasswordForm(false);
    } catch (error) {
      toast.error('Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-4">
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body className="text-center">
              <Image
                src={previewImage}
                roundedCircle
                fluid
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                className="mb-3"
              />
              {editing && (
                <Form.Group controlId="formImage" className="mb-3">
                  <Form.Label>Change Profile Picture</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Form.Group>
              )}
              <h4>{user.name}</h4>
              <p className="text-muted">{user.university}</p>
              <p>{user.bio}</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Profile Information</h5>
              {!editing ? (
                <Button variant="outline-primary" onClick={() => setEditing(true)}>
                  <FaEdit className="me-1" /> Edit Profile
                </Button>
              ) : (
                <div>
                  <Button variant="outline-secondary" className="me-2" onClick={() => setEditing(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleSubmit} disabled={loading}>
                    {loading ? (
                      <>
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                        <span className="visually-hidden">Loading...</span>
                      </>
                    ) : (
                      <>
                        <FaSave className="me-1" /> Save Changes
                      </>
                    )}
                  </Button>
                </div>
              )}
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>
                    <FaUser className="me-2" /> Full Name
                  </Form.Label>
                  <Col sm={9}>
                    {editing ? (
                      <Form.Control
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleInputChange}
                        required
                      />
                    ) : (
                      <Form.Control plaintext readOnly defaultValue={user.name} />
                    )}
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>
                    <FaEnvelope className="me-2" /> Email
                  </Form.Label>
                  <Col sm={9}>
                    {editing ? (
                      <Form.Control
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                        required
                      />
                    ) : (
                      <Form.Control plaintext readOnly defaultValue={user.email} />
                    )}
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>
                    <FaUniversity className="me-2" /> University
                  </Form.Label>
                  <Col sm={9}>
                    {editing ? (
                      <Form.Select
                        name="university"
                        value={user.university}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="Addis Ababa University">Addis Ababa University</option>
                        <option value="Bahir Dar University">Bahir Dar University</option>
                        <option value="Mekelle University">Mekelle University</option>
                        {/* Add more universities as needed */}
                      </Form.Select>
                    ) : (
                      <Form.Control plaintext readOnly defaultValue={user.university} />
                    )}
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>
                    Department
                  </Form.Label>
                  <Col sm={9}>
                    {editing ? (
                      <Form.Control
                        type="text"
                        name="department"
                        value={user.department}
                        onChange={handleInputChange}
                        required
                      />
                    ) : (
                      <Form.Control plaintext readOnly defaultValue={user.department} />
                    )}
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>
                    Year
                  </Form.Label>
                  <Col sm={9}>
                    {editing ? (
                      <Form.Select
                        name="year"
                        value={user.year}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                        <option value="5th Year">5th Year</option>
                        <option value="Graduate">Graduate</option>
                      </Form.Select>
                    ) : (
                      <Form.Control plaintext readOnly defaultValue={user.year} />
                    )}
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>
                    Bio
                  </Form.Label>
                  <Col sm={9}>
                    {editing ? (
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="bio"
                        value={user.bio}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <Form.Control plaintext readOnly defaultValue={user.bio} />
                    )}
                  </Col>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>

          <Card className="mt-4">
            <Card.Header>
              <h5 className="mb-0">Change Password</h5>
            </Card.Header>
            <Card.Body>
              {!showPasswordForm ? (
                <Button variant="outline-primary" onClick={() => setShowPasswordForm(true)}>
                  <FaLock className="me-1" /> Change Password
                </Button>
              ) : (
                <Form onSubmit={handlePasswordSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="currentPassword"
                      value={passwordForm.currentPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="newPassword"
                      value={passwordForm.newPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={passwordForm.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-end">
                    <Button variant="outline-secondary" className="me-2" onClick={() => setShowPasswordForm(false)}>
                      Cancel
                    </Button>
                    <Button variant="primary" type="submit" disabled={loading}>
                      {loading ? (
                        <>
                          <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                          <span className="visually-hidden">Loading...</span>
                        </>
                      ) : (
                        'Change Password'
                      )}
                    </Button>
                  </div>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AccountPage;