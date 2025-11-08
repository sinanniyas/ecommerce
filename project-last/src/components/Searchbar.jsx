import React, { useState, useEffect } from "react";
import { InputGroup, FormControl, Dropdown, ListGroup } from "react-bootstrap";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SearchBar() {
  const API_URL = "https://ecommerce-dcx1.onrender.com";
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}/api/categories`).then((res) => setCategories(res.data));
  }, []);

  // Fetch products only when typing
  useEffect(() => {
    if (!searchTerm) {
      setResults([]);
      return;
    }

    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products/search/${searchTerm}`);
        setResults(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, [searchTerm]);

  return (
    <div style={{ position: "relative", width: "600px" }}>
      <InputGroup>
        <FormControl
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-0 shadow-none"
        />
        <InputGroup.Text>
          <FiSearch size={18} />
        </InputGroup.Text>
      </InputGroup>

      {/* Show categories if no search term */}
      {!searchTerm && (
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
          }}
        >
          {categories.map((c) => (
            <ListGroup.Item
              key={c._id}
              action
              onClick={() => navigate(`/category/${c.name}`)}
            >
              {c.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      {/* Show product suggestions if typing */}
      {searchTerm && results.length > 0 && (
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
          }}
        >
          {results.map((p) => (
            <ListGroup.Item
              key={p._id}
              action
              onClick={() => navigate(`/products/${p._id}`)}
            >
              {p.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
}
