import React, { useRef, useEffect, useState, useContext } from "react";
import { Container, Card, Badge } from "react-bootstrap";
import {
  BsChevronLeft,
  BsChevronRight,
  BsHeart,
  BsEye,
  BsCart,
} from "react-icons/bs";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

export default function PopularProducts() {
  const scrollContainerRef = useRef(null);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext); // ✅ get addToCart from context
  const user = JSON.parse(localStorage.getItem("user")); // get logged-in user
  const userId = user?.id;
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const { addToWishlist, removeFromWishlist, wishlist } =
    useContext(WishlistContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products/category/Popular`);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching popular products:", err);
      }
    };
    fetchProducts();
  }, []);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 350;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleAddToCart = (productId) => {
    if (!userId) return alert("Please login to add items to cart.");
    addToCart(productId, 1); // Add 1 quantity by default
  };

  return (
    <>
      <section className="popular-products-section py-5">
        <Container>
          <div className="text-center mb-5">
            <p className="text-uppercase text-muted mb-2 fw-semibold letter-spacing">
              All Time Favorites
            </p>
            <h2 className="display-5 fw-bold mb-2">Popular Products</h2>
            <p className="text-muted">Discover our most loved items</p>
          </div>

          <div className="position-relative">
            <button
              className="scroll-btn scroll-btn-left"
              onClick={() => scroll("left")}
              aria-label="Scroll left"
            >
              <BsChevronLeft size={24} />
            </button>

            <div ref={scrollContainerRef} className="products-scroll-container">
              {products.map((product) => (
                <div key={product._id} className="product-card-wrapper">
                  <Card className="product-card border-0 shadow-sm h-100">
                    <div className="product-image-container position-relative">
                      <Card.Img
                        variant="top"
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                      />

                      {product.discount && (
                        <Badge bg="danger" className="discount-badge">
                          {product.discount}% OFF
                        </Badge>
                      )}

                      <div className="quick-actions">
                        <button
                          className="action-btn"
                          aria-label="Add to wishlist"
                          onClick={() => {
                            if (
                              wishlist.some(
                                (item) => item.productId._id === product._id
                              )
                            ) {
                              removeFromWishlist(product._id);
                            } else {
                              addToWishlist(product._id);
                            }
                          }}
                        >
                          <BsHeart
                            size={18}
                            color={
                              wishlist.some(
                                (item) => item.productId._id === product._id
                              )
                                ? "red"
                                : "black"
                            }
                          />
                        </button>

                        <button
                          className="action-btn"
                          aria-label="Quick view"
                          onClick={() => navigate(`/products/${product._id}`)}
                        >
                          <BsEye size={18} />
                        </button>
                        <button
                          className="action-btn"
                          aria-label="Add to cart"
                          onClick={() => handleAddToCart(product._id)}
                        >
                          <BsCart size={18} />
                        </button>
                      </div>
                    </div>

                    <Card.Body className="text-center">
                      <p className="text-muted small mb-2 text-uppercase">
                        {product.category}
                      </p>
                      <Card.Title className="h6 mb-2 product-name">
                        {product.name}
                      </Card.Title>

                      <div className="mb-2">
                        {[...Array(5)].map((_, index) => (
                          <span
                            key={index}
                            className={index < 5 ? "star-filled" : "star-empty"}
                          >
                            ★
                          </span>
                        ))}
                      </div>

                      <div className="d-flex justify-content-center align-items-center gap-2">
                        <span className="h5 mb-0 fw-bold text-dark">
                          ${product.price}
                        </span>
                        {product.mrp && (
                          <span className="text-muted text-decoration-line-through small">
                            ${product.mrp}
                          </span>
                        )}
                      </div>

                      {product.description && (
                        <p className="text-muted mt-2">{product.description}</p>
                      )}
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>

            <button
              className="scroll-btn scroll-btn-right"
              onClick={() => scroll("right")}
              aria-label="Scroll right"
            >
              <BsChevronRight size={24} />
            </button>
          </div>
        </Container>
      </section>

      {/* Your existing CSS can remain unchanged */}
    </>
  );
}
