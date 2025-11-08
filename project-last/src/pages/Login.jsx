import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css"; // custom CSS

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
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

      // Login request
      const res = await axios.post(`${API_URL}/api/auth/login`, formData);

      const { token, user } = res.data;

      // Store token & user
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Fetch cart & wishlist using token
      const headers = { Authorization: `Bearer ${token}` };
      const [cartRes, wishlistRes] = await Promise.all([
        axios.get(`${API_URL}/api/cart`, { headers }),
        axios.get(`${API_URL}/api/wishlist`, { headers }),
      ]);

      localStorage.setItem("cart", JSON.stringify(cartRes.data));
      localStorage.setItem("wishlist", JSON.stringify(wishlistRes.data));

      setLoading(false);
      navigate("/"); // redirect to home
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
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

      {/* Main login container */}
      <Container className="login-container">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <div className="tab-headers">
              <h1 className="tab-active">Login</h1>
              <span className="tab-separator">|</span>
              <Link to="/register" className="tab-inactive">Register</Link>
            </div>

            <div className="login-form-card">
              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
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

                <Button type="submit" className="login-button" disabled={loading}>
                  {loading ? "LOGGING IN..." : "LOGIN"}
                </Button>
              </Form>

              <p className="mt-3 text-center">
                Don't have an account? <Link to="/register">Register here</Link>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;
