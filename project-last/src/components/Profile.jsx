import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Row, Col, Spinner } from "react-bootstrap";

export default function Profile() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Get user info from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
useEffect(() => {
  const fetchOrders = async () => {
    try {
      console.log("Fetching orders for user ID:", user.id);
      const res = await axios.get(
        `http://localhost:5000/api/orders/user/${user.id}`
      );
      console.log("Orders received:", res.data);
      setOrders(res.data); // save fetched orders
    } catch (err) {
      console.error("Error fetching orders:", err.response?.data || err.message);
    } finally {
      setLoading(false); // stop spinner
    }
  };

  if (user?.id) fetchOrders();
}, [user]);


  return (
    <Container className="my-5">
      {/* 🔹 Header */}
      <div className="text-center mb-4">
        <h2 className="fw-bold text-uppercase">{user?.name || "Profile"}</h2>
        <p className="text-muted">{user?.email}</p>
      </div>

      {/* 🔹 Orders Section */}
      <h4 className="fw-semibold mb-3">My Orders</h4>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : orders.length === 0 ? (
        <p className="text-center text-muted">No orders yet.</p>
      ) : (
        <Row xs={1} md={2} lg={2} className="g-4">
          {orders.map((order) => (
            <Col key={order._id}>
              <Card className="shadow-sm border-0 rounded-4">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="fw-bold mb-0">Order #{order._id.slice(-5)}</h5>
                    <span
                      className={`badge ${
                        order.status === "Pending"
                          ? "bg-warning text-dark"
                          : "bg-success"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-muted mb-1">
                    Date:{" "}
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-muted mb-2">
                    Payment: {order.paymentMode}
                  </p>

                  <h6 className="fw-semibold mt-3">Products:</h6>
                  <ul className="list-unstyled mb-3">
                    {order.products.map((p) => (
                      <li
                        key={p._id}
                        className="d-flex justify-content-between border-bottom py-1"
                      >
                        <span>{p.name}</span>
                        <span>
                          ₹{p.price} × {p.quantity}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="d-flex justify-content-between">
                    <span className="fw-semibold">Total:</span>
                    <span className="fw-bold">₹{order.totalAmount}</span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
