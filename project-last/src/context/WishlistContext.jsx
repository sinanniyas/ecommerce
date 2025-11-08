/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL || "https://ecommerce-dcx1.onrender.com";
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;
    const fetchWishlist = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/wishlist`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWishlist(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchWishlist();
  }, [token]);

  const addToWishlist = async (productId) => {
    if (!token) return alert("Please login first");
    const res = await axios.post(
      `${API_URL}/api/wishlist/add`,
      { productId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setWishlist(res.data.wishlist);
  };

  const removeFromWishlist = async (productId) => {
    const res = await axios.post(
      `${API_URL}/api/wishlist/remove`,
      { productId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setWishlist(res.data.wishlist);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
