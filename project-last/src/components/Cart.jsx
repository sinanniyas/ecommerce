import React, { useContext } from "react";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import { BsTrash, BsPlus, BsDash, BsBagCheck } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function CartPage() {
  const { cart, updateQty, removeFromCart } = useContext(CartContext);
  const shipping = 80;
  const navigate = useNavigate();

  const increaseQty = (productId, qty) => updateQty(productId, qty + 1);
  const decreaseQty = (productId, qty) => {
    if (qty > 1) updateQty(productId, qty - 1);
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );
  const total = subtotal + shipping;

  const goToDetailPage = (productId) => {
    navigate(`/products/${productId}`);
  };
  
  const gotocheckout = () =>{
    navigate(`/checkout`);
  }
  return (
    <div
      style={{
        backgroundColor: "#fafafa",
        minHeight: "100vh",
        padding: "60px 0",
      }}
    >
      <Container>
        <h2 className="text-center fw-semibold mb-5" style={{ color: "#333" }}>
          Your Shopping Cart
        </h2>

        <Row className="g-4">
          {/* Left Side — Cart Items */}
          <Col lg={8}>
            <Card
              className="border-0 shadow-sm p-4 rounded-4"
              style={{ background: "#fff" }}
            >
              <h5 className="fw-bold mb-3" style={{ color: "#ff4c8b" }}>
                Cart Items
              </h5>

              {cart.length === 0 ? (
                <p className="text-muted text-center">Your cart is empty.</p>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.productId._id}
                    className="d-flex align-items-center justify-content-between mb-4 pb-3 border-bottom"
                  >
                    <div className="d-flex align-items-center">
                      {/* Make image clickable */}
                      <Image
                        src={item.productId.image}
                        rounded
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          marginRight: "20px",
                          cursor: "pointer",
                        }}
                        onClick={() => goToDetailPage(item.productId._id)}
                      />
                      <div>
                        {/* Make name clickable */}
                        <h6
                          className="fw-semibold mb-1"
                          style={{ cursor: "pointer" }}
                          onClick={() => goToDetailPage(item.productId._id)}
                        >
                          {item.productId.name}
                        </h6>
                        <div>
                          <span className="text-danger fw-semibold">
                            ₹{item.productId.price}
                          </span>{" "}
                          {item.productId.mrp && (
                            <small className="text-muted text-decoration-line-through">
                              ₹{item.productId.mrp}
                            </small>
                          )}
                        </div>

                        {/* Quantity controls */}
                        <div className="d-flex align-items-center mt-2">
                          <Button
                            variant="light"
                            className="rounded-circle border shadow-sm me-2"
                            onClick={() =>
                              decreaseQty(item.productId._id, item.quantity)
                            }
                          >
                            <BsDash />
                          </Button>
                          <span className="fw-semibold">{item.quantity}</span>
                          <Button
                            variant="light"
                            className="rounded-circle border shadow-sm ms-2"
                            onClick={() =>
                              increaseQty(item.productId._id, item.quantity)
                            }
                          >
                            <BsPlus />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Button onClick={() => removeFromCart(item.productId._id)}>
                      <BsTrash />
                    </Button>
                  </div>
                ))
              )}
            </Card>
          </Col>

          {/* Right Side — Summary Section */}
          <Col lg={4}>
            <Card
              className="border-0 shadow-sm p-4 rounded-4 sticky-top"
              style={{ background: "#fff", top: "100px" }}
            >
              <h5 className="fw-bold mb-3" style={{ color: "#ff4c8b" }}>
                Order Summary
              </h5>

              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <strong>₹{subtotal}</strong>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <strong>₹{shipping}</strong>
              </div>
              <div
                className="d-flex justify-content-between border-top pt-3 fw-semibold"
                style={{ fontSize: "1.1rem" }}
              >
                <span>Total</span>
                <span style={{ color: "#ff4c8b" }}>₹{total}</span>
              </div>

              <Button
                variant="light"
                className="w-100 fw-semibold border-0 py-2 rounded-pill mt-4"
                style={{
                  background: "linear-gradient(90deg, #ff4c8b, #ff8fab)",
                  color: "white",
                  letterSpacing: "0.5px",
                }}
                onClick={()=>gotocheckout()}
              >
                <BsBagCheck className="me-2" />
                proceed to checkout
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
