import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { FaLanguage, FaPalette, FaBell, FaSave } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    language: 'en',
    theme: 'light',
    notifications: true,
    emailNotifications: true
  });
  const [loading, setLoading] = useState(false);
  const [themes] = useState([
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System Default' }
  ]);
  const [languages] = useState([
    { value: 'en', label: 'English' },
    { value: 'am', label: 'Amharic' },
    { value: 'or', label: 'Oromo' },
    { value: 'tg', label: 'Tigrinya' }
  ]);

  useEffect(() => {
    // Load settings from localStorage or API
    const savedSettings = JSON.parse(localStorage.getItem('userSettings')) || {
      language: 'en',
      theme: 'light',
      notifications: true,
      emailNotifications: true
    };
    setSettings(savedSettings);
  }, []);

  const handleSettingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem('userSettings', JSON.stringify(settings));
      toast.success('Settings saved successfully');
      // Apply theme immediately
      if (settings.theme === 'dark') {
        document.body.classList.add('dark-theme');
      } else {
        document.body.classList.remove('dark-theme');
      }
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-4">
      <Card>
        <Card.Header>
          <h4>Settings</h4>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <h5 className="mb-3 d-flex align-items-center">
                  <FaLanguage className="me-2" /> Language Settings
                </h5>
                <Form.Group className="mb-4">
                  <Form.Label>Application Language</Form.Label>
                  <Form.Select
                    name="language"
                    value={settings.language}
                    onChange={handleSettingChange}
                  >
                    {languages.map(lang => (
                      <option key={lang.value} value={lang.value}>
                        {lang.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <h5 className="mb-3 d-flex align-items-center">
                  <FaPalette className="me-2" /> Appearance
                </h5>
                <Form.Group className="mb-4">
                  <Form.Label>Theme</Form.Label>
                  <Form.Select
                    name="theme"
                    value={settings.theme}
                    onChange={handleSettingChange}
                  >
                    {themes.map(theme => (
                      <option key={theme.value} value={theme.value}>
                        {theme.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <h5 className="mb-3 d-flex align-items-center">
                  <FaBell className="me-2" /> Notifications
                </h5>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="notifications-switch"
                    label="Enable Notifications"
                    name="notifications"
                    checked={settings.notifications}
                    onChange={handleSettingChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="email-notifications-switch"
                    label="Email Notifications"
                    name="emailNotifications"
                    checked={settings.emailNotifications}
                    onChange={handleSettingChange}
                    disabled={!settings.notifications}
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-end mt-4">
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                    <span className="visually-hidden">Loading...</span>
                  </>
                ) : (
                  <>
                    <FaSave className="me-1" /> Save Settings
                  </>
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SettingsPage;