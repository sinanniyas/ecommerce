import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from './context/WishlistContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
 
  <BrowserRouter>
   <CartProvider>
    <WishlistProvider>
        <App />
      </WishlistProvider>
    </CartProvider>
  </BrowserRouter>,
)
