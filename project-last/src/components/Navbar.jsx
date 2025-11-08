import React, { useState, useEffect, useRef } from "react";
import {
  Navbar,
  Nav,
  Container,
  Badge,
  NavDropdown,
  InputGroup,
  FormControl,
  ListGroup,
} from "react-bootstrap";
import { FiSearch, FiUser, FiShoppingCart, FiHeart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function BasicExample() {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const API_URL = "https://ecommerce-dcx1.onrender.com";
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Load categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/categories`);
        setCategories(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategories();
  }, []);

  // Load logged-in user
  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (loggedUser) setUser(loggedUser);
  }, []);

  // Search products when typing
  useEffect(() => {
    const fetchProducts = async () => {
      if (!searchTerm) return setResults([]);
      try {
        const res = await axios.get(`${API_URL}/api/products/search/${searchTerm}`);
        setResults(res.data.slice(0, 7));
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, [searchTerm]);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const gotowish = () => navigate("/wishlist");
  const gotoprofile = () => navigate("/profile");
  const clicked = () => navigate("/cart");

  return (
    <Navbar bg="white" expand="lg" className="py-3 border-bottom shadow-sm">
      <Container>
        {/* LOGO */}
        <Navbar.Brand href="/" className="fw-bold fs-3 text-dark">
          Flone.
        </Navbar.Brand>

        <Navbar.Collapse id="flone-navbar-nav" className="mt-3 mt-lg-0">
          <Nav className="mx-auto text-center">
            <Nav.Link href="/" className="py-2">Home</Nav.Link>
            <NavDropdown title="Shop" id="shop-dropdown">
              <NavDropdown.Item href="/category/Popular">Popular products</NavDropdown.Item>
              <NavDropdown.Item href="/category/Trending">Trending products</NavDropdown.Item>
              <NavDropdown.Item href="/all">Product Details</NavDropdown.Item>
            </NavDropdown>
          
            <Nav.Link href="/about" className="py-2">About</Nav.Link>
          </Nav>

          {/* SEARCH */}
          <div ref={dropdownRef} style={{ position: "relative", width: "300px" }} className="mx-auto">
            <InputGroup>
              <FormControl
                placeholder="Search products or categories..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowDropdown(true); // always show dropdown when typing
                }}
                onFocus={() => setShowDropdown(true)} // show dropdown on focus
              />
              <InputGroup.Text>
                <FiSearch />
              </InputGroup.Text>
            </InputGroup>

            {showDropdown && (
              <ListGroup
                style={{
                  position: "absolute",
                  top: "40px",
                  left: 0,
                  right: 0,
                  zIndex: 999,
                  background: "white",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  maxHeight: "300px",
                  overflowY: "auto",
                }}
              >
                {searchTerm
                  ? results.map((p) => (
                      <ListGroup.Item
                        key={p._id}
                        action
                        onClick={() => {
                          navigate(`/products/${p._id}`);
                          setSearchTerm("");
                          setShowDropdown(false);
                        }}
                      >
                        {p.name}
                      </ListGroup.Item>
                    ))
                  : categories.map((c) => (
                      <ListGroup.Item
                        key={c._id}
                        action
                        onClick={() => {
                          navigate(`/category/${c.name}`);
                          setShowDropdown(false);
                        }}
                      >
                        {c.name}
                      </ListGroup.Item>
                    ))}
              </ListGroup>
            )}
          </div>

          {/* USER ICONS */}
          <Nav className="d-none d-lg-flex align-items-center ms-3">
            <Nav.Link className="px-2 position-relative" onClick={gotowish}>
              <FiHeart size={20} />
              <Badge
                bg="dark"
                pill
                className="position-absolute top-0 start-100 translate-middle"
                style={{ fontSize: "0.6rem" }}
              >0</Badge>
            </Nav.Link>

            <Nav.Link className="px-2 position-relative" onClick={clicked}>
              <FiShoppingCart size={20} />
              <Badge
                bg="dark"
                pill
                className="position-absolute top-0 start-100 translate-middle"
                style={{ fontSize: "0.6rem" }}
              >0</Badge>
            </Nav.Link>

            <NavDropdown title={<FiUser size={20} />} id="profile-dropdown" align="end">
              {!user ? (
                <>
                  <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                  <NavDropdown.Item href="/register">Register</NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Item onClick={gotoprofile}>Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
