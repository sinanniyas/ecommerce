import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, Badge, Button, ButtonGroup } from "react-bootstrap";
import { BsHeart, BsEye, BsCart } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import { WishlistContext } from "../context/WishlistContext";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, wishlist } = useContext(WishlistContext);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const API_URL = import.meta.env.VITE_API_URL || "https://ecommerce-dcx1.onrender.com";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products`);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleProductClick = (id) => navigate(`/products/${id}`);

  const handleAddToCart = async (productId) => {
    if (!userId) return alert("Please login to add items to cart.");
    try {
      const res = await axios.post(`${API_URL}/api/cart/add`, {
        userId,
        productId,
        quantity: 1,
      });
      alert(res.data.success ? "Product added to cart!" : "Failed to add product to cart");
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Error adding to cart");
    }
  };

  // Pagination logic
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <p className="text-center mt-5">Loading products...</p>;

  return (
    <section className="py-5">
      <Container>
        <div className="text-center mb-5">
          <h2 className="fw-bold">All Products</h2>
          <p className="text-muted">Browse all products available in the store</p>
        </div>

        <Row className="g-4">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
                <Card className="product-card border-0 shadow-sm h-100">
                  <div className="position-relative product-img-container">
                    <Card.Img
                      variant="top"
                      src={product.image}
                      alt={product.name}
                      className="product-img"
                      onClick={() => handleProductClick(product._id)}
                    />
                    {product.discount && (
                      <Badge bg="danger" className="discount-badge">
                        {product.discount}% OFF
                      </Badge>
                    )}

                    <div className="hover-buttons">
                      <button
                        className="action-btn"
                        onClick={() => {
                          if (wishlist.some((item) => item.productId._id === product._id)) {
                            removeFromWishlist(product._id);
                          } else {
                            addToWishlist(product._id);
                          }
                        }}
                      >
                        <BsHeart
                          size={18}
                          color={wishlist.some((item) => item.productId._id === product._id) ? "red" : "black"}
                        />
                      </button>

                      <button className="action-btn" onClick={() => handleProductClick(product._id)}>
                        <BsEye />
                      </button>

                      <button className="action-btn" onClick={() => handleAddToCart(product._id)}>
                        <BsCart />
                      </button>
                    </div>
                  </div>

                  <Card.Body className="text-center">
                    <p className="text-muted small mb-1 text-uppercase">{product.category}</p>
                    <Card.Title className="fw-semibold mb-2 product-name">{product.name}</Card.Title>

                    <div className="mb-2">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < product.rating ? "star-filled" : "star-empty"}>
                          ★
                        </span>
                      ))}
                    </div>

                    <div className="d-flex justify-content-center align-items-center gap-2">
                      <span className="fw-bold text-dark">${product.price}</span>
                      {product.mrp && (
                        <span className="text-muted text-decoration-line-through small">${product.mrp}</span>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-center text-muted">No products found.</p>
          )}
        </Row>

        {/* Pagination Buttons */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-4">
            <ButtonGroup>
              {[...Array(totalPages)].map((_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? "dark" : "outline-dark"}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
            </ButtonGroup>
          </div>
        )}
      </Container>

      <style jsx>{`
        .product-card {
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .product-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        .product-img-container {
          position: relative;
          height: 260px;
          overflow: hidden;
          background: #f8f9fa;
        }
        .product-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .product-card:hover .product-img {
          transform: scale(1.08);
        }
        .discount-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          padding: 0.35rem 0.6rem;
          font-size: 0.75rem;
          font-weight: 600;
        }
        .hover-buttons {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          gap: 0.5rem;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .product-card:hover .hover-buttons {
          opacity: 1;
        }
        .action-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: none;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        .action-btn:hover {
          background: #000;
          color: #fff;
          transform: scale(1.1);
        }
        .product-name {
          font-size: 0.95rem;
          color: #333;
          min-height: 40px;
        }
        .star-filled {
          color: #ffc107;
        }
        .star-empty {
          color: #ddd;
        }
      `}</style>
    </section>
  );
}
