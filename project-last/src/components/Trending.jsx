import React, { useRef, useEffect, useState } from "react";
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
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

export default function TrendingProducts() {
  const scrollContainerRef = useRef(null);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, wishlist } =
    useContext(WishlistContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || "https://ecommerce-dcx1.onrender.com";
        const res = await axios.get(
          `${API_URL}/api/products/category/Trending`
        );
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching trending products:", err);
      }
    };
    fetchProducts();
  }, []);

 // replace with actual logged-in user ID
  const API_URL = import.meta.env.VITE_API_URL || "https://ecommerce-dcx1.onrender.com";

 

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

  return (
    <>
      <section className="trending-products-section py-5">
        <Container>
          {/* Section Header */}
          <div className="text-center mb-5">
            <p className="text-uppercase text-muted mb-2 fw-semibold letter-spacing">
              Hot Picks
            </p>
            <h2 className="display-5 fw-bold mb-2">Trending Products</h2>
            <p className="text-muted">Check out what’s trending right now</p>
          </div>

          {/* Products Slider Container */}
          <div className="position-relative">
            {/* Left Arrow */}
            <button
              className="scroll-btn scroll-btn-left"
              onClick={() => scroll("left")}
              aria-label="Scroll left"
            >
              <BsChevronLeft size={24} />
            </button>

            {/* Products Scroll Container */}
            <div ref={scrollContainerRef} className="products-scroll-container">
              {products.map((product) => (
                <div key={product._id} className="product-card-wrapper">
                  <Card className="product-card border-0 shadow-sm h-100">
                    {/* Product Image */}
                    <div className="product-image-container position-relative">
                      <Card.Img
                        variant="top"
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                      />

                      {/* Discount Badge */}
                      {product.discount && (
                        <Badge bg="danger" className="discount-badge">
                          {product.discount}% OFF
                        </Badge>
                      )}

                      {/* Quick Action Buttons */}
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
                          onClick={() => addToCart(product._id, 1)}
                        >
                          <BsCart size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <Card.Body className="text-center">
                      <p className="text-muted small mb-2 text-uppercase">
                        {product.category}
                      </p>
                      <Card.Title className="h6 mb-2 product-name">
                        {product.name}
                      </Card.Title>

                      {/* Rating */}
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

                      {/* Price */}
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

                      {/* Description */}
                      {product.description && (
                        <p className="text-muted mt-2">{product.description}</p>
                      )}
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>

            {/* Right Arrow */}
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

      {/* Reuse same CSS as PopularProducts */}
      <style jsx>{`
        .trending-products-section {
          background-color: #fff;
        }

        .letter-spacing {
          letter-spacing: 0.1em;
        }

        .products-scroll-container {
          display: flex;
          gap: 1.5rem;
          overflow-x: auto;
          overflow-y: hidden;
          scroll-behavior: smooth;
          padding: 1rem 0;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .products-scroll-container::-webkit-scrollbar {
          display: none;
        }

        .product-card-wrapper {
          flex: 0 0 300px;
          min-width: 300px;
        }

        .product-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
          border-radius: 12px;
          overflow: hidden;
        }

        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15) !important;
        }

        .product-image-container {
          overflow: hidden;
          height: 300px;
          background-color: #f8f9fa;
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .product-card:hover .product-image {
          transform: scale(1.1);
        }

        .discount-badge {
          position: absolute;
          top: 15px;
          right: 15px;
          z-index: 2;
          padding: 0.4rem 0.8rem;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.05em;
        }

        .quick-actions {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          gap: 0.5rem;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .product-card:hover .quick-actions {
          opacity: 1;
        }

        .action-btn {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          border: none;
          background-color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .action-btn:hover {
          background-color: #000;
          color: #fff;
          transform: scale(1.1);
        }

        .product-name {
          color: #333;
          font-weight: 600;
          min-height: 40px;
        }

        .star-filled {
          color: #ffc107;
          font-size: 1rem;
        }

        .star-empty {
          color: #ddd;
          font-size: 1rem;
        }

        .scroll-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: none;
          background-color: white;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: all 0.3s ease;
        }

        .scroll-btn:hover {
          background-color: #000;
          color: #fff;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
        }

        .scroll-btn-left {
          left: -25px;
        }

        .scroll-btn-right {
          right: -25px;
        }

        @media (max-width: 768px) {
          .scroll-btn {
            display: none;
          }

          .product-card-wrapper {
            flex: 0 0 250px;
            min-width: 250px;
          }

          .product-image-container {
            height: 250px;
          }
        }
      `}</style>
    </>
  );
}
