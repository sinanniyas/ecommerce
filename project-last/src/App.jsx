import React from 'react';
import { Routes, Route } from "react-router-dom";
import Frontpage from './pages/Frontpage';
import Layout from './pages/Layout';
import Listing from './components/Listing';
import Detailpage from './components/Detailpage';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import Cart from './components/Cart';
import CheckoutPage from './components/Buypage';
import Ordersuccess from './components/Ordersuccess';
import Profile from './components/Profile';
import WishlistPage from './components/Wishlist';
import About from './pages/About';
import AllProducts from './components/Allproducts';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout/>} >
        <Route index element={<Frontpage/>} />
        <Route path='/category/:name' element={<Listing/>}/>
        <Route path="/products/:id" element={<Detailpage />} />
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/checkout'element={<CheckoutPage/>}/>
        <Route path='/ordersuccess'element={<Ordersuccess/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/wishlist" element={<WishlistPage/>} />
        <Route path='/about' element={<About/>}/>
        <Route path='/all' element={<AllProducts/>}/>
        </Route> 
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='register' element={<RegisterPage/>}/>
    </Routes>
  );
}

export default App;
