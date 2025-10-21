import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { CheckCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Ordersuccess() {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the latest order from backend
    const fetchLatestOrder = async () => {
      try {
        const res = await axios.get("https://ecommerce-dcx1.onrender.com/api/orders");
        if (res.data && res.data.length > 0) {
          // Assuming the last order is the latest one
          setOrder(res.data[res.data.length - 1]);
        }
      } catch (err) {
        console.error("Failed to fetch order:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestOrder();
  }, []);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!order) {
    return (
      <Container className="py-5 text-center">
        <p>No recent order found.</p>
        <Button onClick={() => navigate("/")}>Go Home</Button>
      </Container>
    );
  }

  const subtotal = order.products.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = order.totalAmount - subtotal;

  return (
    <Container className="py-5 d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <Card className="p-5 shadow-lg rounded-4 text-center" style={{ maxWidth: "600px", width: "100%" }}>
        <CheckCircle size={60} className="text-success mb-4" />
        <h2 className="fw-bold mb-3">Thank You, {order.customer.firstName}!</h2>
        <p className="text-muted mb-2">Your order <strong>#{order._id}</strong> has been placed successfully.</p>
        <p className="text-muted mb-4">We are preparing it for shipment.</p>

        {/* Order Summary */}
        <Card className="p-3 mb-4 shadow-sm rounded-3">
          <h5 className="fw-semibold mb-3">Order Summary</h5>
          <Row className="mb-2">
            <Col>Subtotal:</Col>
            <Col className="text-end">₹{subtotal.toFixed(2)}</Col>
          </Row>
          <Row className="mb-2">
            <Col>Shipping:</Col>
            <Col className="text-end">₹{shipping.toFixed(2)}</Col>
          </Row>
          <Row className="border-top pt-2 fw-bold">
            <Col>Total:</Col>
            <Col className="text-end text-primary">₹{order.totalAmount.toFixed(2)}</Col>
          </Row>
        </Card>

        <p className="text-muted mb-4">We’ve also sent a confirmation email to your registered email address.</p>

        <Button
          variant="primary"
          onClick={() => navigate("/")}
          className="px-5 py-2"
          style={{
            background: "linear-gradient(90deg, #ff4c8b, #ff8fab)",
            border: "none",
            borderRadius: "50px",
            fontWeight: "600",
          }}
        >
          Continue Shopping
        </Button>
      </Card>
    </Container>
  );
}
