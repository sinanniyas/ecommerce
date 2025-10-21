import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css"; // same CSS file used for login

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || "https://ecommerce-dcx1.onrender.com";
      await axios.post(`${API_URL}/api/auth/register`, formData);

      navigate("/login"); // redirect to login after successful register
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Breadcrumb */}
      <div className="breadcrumb-section">
        <Container>
          <div className="breadcrumb-content">
            <Link to="/" className="breadcrumb-link">HOME</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-active">LOGIN REGISTER</span>
          </div>
        </Container>
      </div>

      {/* Register Container */}
      <Container className="login-container">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <div className="tab-headers">
              <Link to="/login" className="tab-inactive">Login</Link>
              <span className="tab-separator">|</span>
              <h1 className="tab-active">Register</h1>
            </div>

            <div className="login-form-card">
              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                    className="custom-input"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="custom-input"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                    className="custom-input"
                  />
                </Form.Group>

                <Button
                  type="submit"
                  className="login-button"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "REGISTER"}
                </Button>
              </Form>

              <p className="mt-3 text-center">
                Already have an account? <Link to="/login">Login here</Link>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterPage;
