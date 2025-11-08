import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Card, Badge, Button, Breadcrumb } from "react-bootstrap";
import { BsHeart, BsCart } from "react-icons/bs";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";

const Detailpage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  useContext(CartContext);

  // Fetch user inside useEffect to make sure it's read correctly
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && (user.id || user._id)) setUserId(user.id || user._id);
  }, []);

 const handleAddToCart = async () => {
  if (!userId) return alert("Please login to add items to cart.");
  if (!product?._id) return alert("Product not loaded yet!");

  try {
    const API_URL = import.meta.env.VITE_API_URL || "https://ecommerce-dcx1.onrender.com";
    const res = await axios.post(`${API_URL}/api/cart/add`, {
      userId,
      productId: product._id,
      quantity: 1
    });
    console.log("Added to cart:", res.data);
    alert("Product added to cart!");
  } catch (err) {
    console.error("Error adding to cart:", err);
    alert("Failed to add to cart. Check console.");
  }
};


  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      const API_URL = import.meta.env.VITE_API_URL || "https://ecommerce-dcx1.onrender.com";
      try {
        const res = await axios.get(`${API_URL}/api/products/${id}`);
        setProduct(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center mt-5">Loading product...</p>;
  if (!product) return <p className="text-center mt-5">Product not found</p>;

  return (
    <section className="py-5 product-detail-section">
      <Container>
        <Breadcrumb className="mb-4">
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Home</Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/category/${product.category}` }}>{product.category}</Breadcrumb.Item>
          <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
        </Breadcrumb>

        <Row className="g-4">
          <Col xs={12} md={6}>
            <Card>
              <Card.Img variant="top" src={product.image} alt={product.name} />
            </Card>
          </Col>

          <Col xs={12} md={6}>
            <h2>{product.name}</h2>
            <p>{product.category}</p>
            <h4>${product.price}</h4>
            {product.mrp && product.discount && (
              <>
                <span className="text-decoration-line-through">${product.mrp}</span>
                <Badge bg="danger">{product.discount}% OFF</Badge>
              </>
            )}
            {product.quantity !== undefined && <p>Available Quantity: {product.quantity}</p>}
            {product.description && <p>{product.description}</p>}

            <div className="d-flex gap-2">
              <Button variant="dark" onClick={handleAddToCart}>
                <BsCart className="me-2" /> Add to Cart
              </Button>
              <Button variant="outline-dark">
                <BsHeart className="me-2" /> Wishlist
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Detailpage;
