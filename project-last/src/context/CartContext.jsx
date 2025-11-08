/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL || "https://ecommerce-dcx1.onrender.com";
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;
    const fetchCart = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCart(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCart();
  }, [token]);

  const addToCart = async (productId, quantity = 1) => {
    if (!token) return alert("Please login first");
    const res = await axios.post(
      `${API_URL}/api/cart/add`,
      { productId, quantity },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setCart(res.data.cart);
  };

  const updateQty = async (productId, quantity) => {
    const res = await axios.post(
      `${API_URL}/api/cart/update`,
      { productId, quantity },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setCart(res.data.cart);
  };

  const removeFromCart = async (productId) => {
    const res = await axios.post(
      `${API_URL}/api/cart/remove`,
      { productId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setCart(res.data.cart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQty, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
