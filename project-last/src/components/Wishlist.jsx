import React, { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import { BsHeartFill, BsCart } from "react-icons/bs";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext); // ✅ use addToCart

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId, 1); // ✅ add to cart
      removeFromWishlist(productId); // ✅ optional: remove from wishlist after adding
      alert("Added to cart!");
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  return (
    <Container className="my-5">
      <h2 className="text-center fw-bold mb-4">My Wishlist</h2>

      {wishlist.length === 0 ? (
        <div className="text-center mt-5">
          <BsHeartFill size={50} color="#e83e8c" />
          <h5 className="mt-3 text-muted">Your wishlist is empty</h5>
        </div>
      ) : (
        <Row className="gy-4">
          {wishlist.map((item) => (
            <Col key={item.productId._id} md={4}>
              <Card className="border-0 shadow-sm rounded-4 p-3">
                <div className="position-relative">
                  <Image
                    src={item.productId.image}
                    alt={item.productId.name}
                    className="rounded-4 w-100"
                    style={{ height: "260px", objectFit: "cover" }}
                  />
                  <Button
                    variant="light"
                    className="position-absolute top-0 end-0 m-2 rounded-circle shadow-sm"
                    onClick={() => removeFromWishlist(item.productId._id)}
                  >
                    <BsHeartFill color="#e83e8c" />
                  </Button>
                </div>

                <Card.Body className="text-center">
                  <Card.Title className="fw-semibold mb-2">
                    {item.productId.name}
                  </Card.Title>
                  <h5 className="fw-bold">
                    ₹{item.productId.price.toLocaleString()}
                  </h5>
                  <Button
                    variant="dark"
                    className="rounded-pill px-4 mt-3"
                    onClick={() => handleAddToCart(item.productId._id)} // ✅ functional add to cart
                  >
                    <BsCart className="me-2" /> Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default WishlistPage;
