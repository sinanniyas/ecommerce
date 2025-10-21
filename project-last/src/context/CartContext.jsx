import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Fetch cart on mount
  useEffect(() => {
    if (!userId) return;
    const fetchCart = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/cart/${userId}`);
        setCart(res.data);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };
    fetchCart();
  }, [userId]);

  // Add item to cart
  const addToCart = async (productId, quantity = 1) => {
    if (!userId) return alert("Please log in to add products");
    try {
      const res = await axios.post(`${API_URL}/api/cart/add`, {
        userId,
        productId,
        quantity,
      });
      setCart(res.data.cart);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  // Update quantity
  const updateQty = async (productId, quantity) => {
    try {
      const res = await axios.post(`${API_URL}/api/cart/update`, {
        userId,
        productId,
        quantity,
      });
      setCart(res.data.cart);
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  // Remove item
  const removeFromCart = async (productId) => {
    try {
      const res = await axios.post(`${API_URL}/api/cart/remove`, {
        userId,
        productId,
      });
      setCart(res.data.cart);
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  return (
    <CartContext.Provider value={{ cart,setCart, addToCart, updateQty, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
