import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Image,
} from "react-bootstrap";
import { CartContext } from "../context/CartContext";

export default function CheckoutPage() {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // Fetch user from localStorage
useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (storedUser && (storedUser._id || storedUser.id)) {
    setUser(storedUser);
  }
  setLoadingUser(false);
}, []);


  // Redirect if no user
  useEffect(() => {
    if (!loadingUser && !user) navigate("/login");
  }, [loadingUser, user, navigate]);

  const [formData, setFormData] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    country: "India",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postcode: "",
    phone: "",
    paymentMode: "Cash on delivery",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const subtotal = cart.reduce(
    (acc, item) => acc + (item.productId?.price || 0) * item.quantity,
    0
  );
  const shipping = 80;
  const total = subtotal + shipping;

  // Prefill form when user loads
useEffect(() => {
  if (user) {
    setFormData((prev) => ({
      ...prev,
      userId: user._id || user.id, // handle both MongoDB _id and id
      name: user.name || "",       // use 'name' instead of firstName + lastName
      email: user.email || "",
      phone: user.phone || "",     // optional, if you’ll add phone later
    }));
  }
}, [user]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      setMessage("Your cart is empty!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const payload = {
        ...formData,
        cart,
        shipping,
        total,
      };

      const res = await fetch("https://ecommerce-dcx1.onrender.com/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("✅ Order placed:", data);
        setCart([]);
        localStorage.removeItem("cart");
        navigate("/ordersuccess");
      } else {
        setMessage(data.message || "Failed to place order.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loadingUser) return <div>Loading...</div>;

  return (
    <Container className="py-5">
      <Row>
        {/* Left: Billing Details */}
        <Col md={7} className="mb-4">
          <h4 className="fw-bold mb-4">Billing Details</h4>
          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Country</Form.Label>
              <Form.Select
                name="country"
                value={formData.country}
                onChange={handleChange}
              >
                <option>Select a country</option>
                <option>India</option>
                <option>USA</option>
                <option>UK</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Street Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="House number and street name"
                className="mb-2"
                name="address1"
                value={formData.address1}
                onChange={handleChange}
              />
              <Form.Control
                type="text"
                placeholder="Apartment, suite, unit etc."
                name="address2"
                value={formData.address2}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Town / City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </Form.Group>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>State / County</Form.Label>
                  <Form.Control
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Postcode / ZIP</Form.Label>
                  <Form.Control
                    type="text"
                    name="postcode"
                    value={formData.postcode}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Payment</Form.Label>
                  <Form.Select
                    name="paymentMode"
                    value={formData.paymentMode}
                    onChange={handleChange}
                  >
                    <option>Cash on delivery</option>
                    <option>UPI</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Col>

        {/* Right: Order Summary */}
        <Col md={5}>
          <h4 className="fw-bold mb-4">Your Order</h4>
          <Card className="p-4 shadow-sm rounded-4">
            <div className="d-flex justify-content-between fw-bold border-bottom pb-2 mb-3">
              <span>Product</span>
              <span>Total</span>
            </div>

            {cart.length > 0 ? (
              cart.map((item) => (
                <div
                  key={item._id}
                  className="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom"
                >
                  <div className="d-flex align-items-center">
                    <Image
                      src={item.productId?.image}
                      rounded
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "cover",
                        marginRight: "10px",
                      }}
                    />
                    <div>
                      <div className="fw-semibold">{item.productId?.name}</div>
                      <small className="text-muted">
                        {item.quantity} × ₹{item.productId?.price}
                      </small>
                    </div>
                  </div>
                  <span className="fw-semibold text-dark">
                    ₹{((item.productId?.price || 0) * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-muted mb-3">No products added yet.</div>
            )}

            <div className="d-flex justify-content-between border-top pt-2 mb-2">
              <span>Shipping</span>
              <span>₹{shipping}</span>
            </div>

            <div className="d-flex justify-content-between border-top pt-2 fw-bold">
              <span>Total</span>
              <span className="text-primary">₹{total.toFixed(2)}</span>
            </div>

            {message && <div className="mt-3 text-center">{message}</div>}

            <Button
              onClick={handlePlaceOrder}
              variant="primary"
              className="w-100 mt-4 py-2"
              disabled={loading}
              style={{
                background: "linear-gradient(90deg, #ff4c8b, #ff8fab)",
                border: "none",
                borderRadius: "50px",
                fontWeight: "600",
              }}
            >
              {loading ? "Placing Order..." : "PLACE ORDER"}
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
