import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;
  const API_URL = import.meta.env.VITE_API_URL || "https://ecommerce-dcx1.onrender.com";

  // Fetch wishlist on mount
  useEffect(() => {
    if (!userId) return;
    const fetchWishlist = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/wishlist/${userId}`);
        setWishlist(res.data);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
      }
    };
    fetchWishlist();
  }, [userId]);

  // Add item
  const addToWishlist = async (productId) => {
    if (!userId) return alert("Please log in to add to wishlist");
    try {
      const res = await axios.post(`${API_URL}/api/wishlist/add`, {
        userId,
        productId,
      });
      setWishlist(res.data.wishlist);
    } catch (err) {
      console.error("Error adding to wishlist:", err);
    }
  };

  // Remove item
  const removeFromWishlist = async (productId) => {
    try {
      const res = await axios.post(`${API_URL}/api/wishlist/remove`, {
        userId,
        productId,
      });
      setWishlist(res.data.wishlist);
    } catch (err) {
      console.error("Error removing from wishlist:", err);
    }
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
