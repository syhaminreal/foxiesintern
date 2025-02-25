import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import { useHistory } from 'react-router-dom';

function SignUp() {
  const history = useHistory();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle user sign-up with email and password here
    // Example: send form data to the backend for registration
    console.log('Sign Up data:', formData);
  };

  const handleOAuth = (provider) => {
    // Redirect to OAuth authentication route (e.g., Google or GitHub)
    // The backend would handle this request and perform OAuth logic
    console.log('OAuth with', provider);
    // For example, you can redirect to your backend API OAuth route
    window.location.href = `/auth/${provider}`;
  };

  return (
    <div className="container mt-5">
      <h2>Sign Up</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>

      <div className="mt-4">
        <Button
          variant="outline-danger"
          className="me-3"
          onClick={() => handleOAuth('google')}
        >
          <FontAwesomeIcon icon={faGoogle} className="me-2" />
          Sign Up with Google
        </Button>

        <Button
          variant="outline-dark"
          onClick={() => handleOAuth('github')}
        >
          <FontAwesomeIcon icon={faGithub} className="me-2" />
          Sign Up with GitHub
        </Button>
      </div>
    </div>
  );
}

export default SignUp;
