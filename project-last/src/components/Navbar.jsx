import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
import { FiSearch, FiUser, FiShoppingCart, FiHeart } from "react-icons/fi";
import './nav.css';
import { useNavigate } from "react-router-dom";


function BasicExample() {
  const [user, setUser] = useState(null);
   const navigate = useNavigate();

  // Example: check if user is logged in via localStorage (replace with your auth logic)
  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (loggedUser) setUser(loggedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // clear user
    setUser(null);
  };
   
  const gotowish =() =>{
    navigate('/wishlist')
  }
   
   const gotoprofile =() =>{
    navigate('/profile')
   }

   const clicked =() =>{
          navigate('/cart')
   }
  return (
    <Navbar bg="white" expand="lg" className="py-3 border-bottom shadow-sm">
      <Container>
        {/* Logo */}
        <Navbar.Brand href="/" className="fw-bold fs-3 text-dark">
          Flone.
        </Navbar.Brand>

        {/* Mobile Toggle */}
        <Navbar.Toggle aria-controls="flone-navbar-nav" />
        <Navbar.Collapse id="flone-navbar-nav">
          {/* Center Navigation Links */}
          <Nav className="mx-auto">
            <NavDropdown title="Home" id="home-dropdown" className="px-2">
              <NavDropdown.Item href="#home1">Home 1</NavDropdown.Item>
              <NavDropdown.Item href="#home2">Home 2</NavDropdown.Item>
              <NavDropdown.Item href="#home3">Home 3</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Shop" id="shop-dropdown" className="px-2">
              <NavDropdown.Item href="#shop-grid">Shop Grid</NavDropdown.Item>
              <NavDropdown.Item href="#shop-list">Shop List</NavDropdown.Item>
              <NavDropdown.Item href="#product-details">Product Details</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="#collection" className="px-3">
              Collection
            </Nav.Link>

            <NavDropdown title="Pages" id="pages-dropdown" className="px-2">
              <NavDropdown.Item href="#about">About</NavDropdown.Item>
              <NavDropdown.Item href="#cart">Cart</NavDropdown.Item>
              <NavDropdown.Item href="#checkout">Checkout</NavDropdown.Item>
              <NavDropdown.Item href="#wishlist">Wishlist</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Blog" id="blog-dropdown" className="px-2">
              <NavDropdown.Item href="#blog-grid">Blog Grid</NavDropdown.Item>
              <NavDropdown.Item href="#blog-list">Blog List</NavDropdown.Item>
              <NavDropdown.Item href="#blog-details">Blog Details</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="#contact" className="px-3">
              Contact Us
            </Nav.Link>
          </Nav>

          {/* Right Side Icons */}
          <Nav className="align-items-center">
            <Nav.Link href="#search" className="px-2 position-relative">
              <FiSearch size={20} />
            </Nav.Link>

            {/* Profile Dropdown */}
            <NavDropdown
              title={<FiUser size={20} />}
              id="profile-dropdown"
              align="end"
              className="px-2"
            >
              {!user ? (
                <>
                  <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                  <NavDropdown.Item href="/register">Register</NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Item onClick={gotoprofile}>profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </>
              )}
            </NavDropdown>

            <Nav.Link href="" className="px-2 position-relative">
              <FiHeart size={20} onClick={gotowish} />
              <Badge
                bg="dark"
                pill
                className="position-absolute top-0 start-100 translate-middle"
                style={{ fontSize: "0.6rem", padding: "0.25rem 0.4rem" }}
              >
                0
              </Badge>
            </Nav.Link>

            <Nav.Link href="" className="px-2 position-relative">
              <FiShoppingCart size={20} onClick={clicked}/>
              <Badge
                bg="dark"
                pill
                className="position-absolute top-0 start-100 translate-middle"
                style={{ fontSize: "0.6rem", padding: "0.25rem 0.4rem" }}
              >
                0
              </Badge>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
