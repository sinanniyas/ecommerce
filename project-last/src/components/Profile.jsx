import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Row, Col, Spinner, Image } from "react-bootstrap";

export default function Profile() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        console.log("Fetching orders for user ID:", user.id);
        const res = await axios.get(
          `http://localhost:5000/api/orders/user/${user.id}`
        );
        console.log("Orders received:", res.data);
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) fetchOrders();
  }, [user]);

  return (
    <div>
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
        <div className="d-flex flex-column gap-4">
          {orders.map((order) => (
            <Card
              key={order._id}
              className="shadow-sm border-0 rounded-4 p-3 d-flex flex-row align-items-start order-card"
            >
              {/* Left: Order info */}
              <div className="flex-grow-1">
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
                <p className="text-muted mb-2">Payment: {order.paymentMode}</p>

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
                  <span className="fw-bold text-success">
                    ₹{order.totalAmount}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Container>
    <style jsx>
      {
        `
        .order-card {
  transition: all 0.2s ease;
}

.order-card:hover {
  transform: scale(1.01);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.order-card ul li span:first-child {
  max-width: 60%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
`
      }
    </style>
    </div>
  );
}
