import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";


import "./css/style.css";

import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Dashboard";
import Grocery from "./New items/Grocery";
import Dashboardcards from "./partials/Dashboardcards";
import GroceryForm from "./New items/Form";
import Editform from "./New items/Editform";
import Categoryform from "./New items/Categoryform";
import Category from "./New items/Category";
import Editcategory from "./New items/Editcategory";
import Orders from "./New items/Orders";
import Oredrdetail from "./New items/Oredrdetail";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<Dashboardcards />} />
          <Route path="/grocery" element={<Grocery />} />
          <Route path="/createform" element={<GroceryForm />}/>
          <Route path="/editform/:id" element={<Editform />}/> 
          <Route path="/createcategory" element={<Categoryform />}/>
          <Route path="/category" element={<Category/>}/>
          <Route path="/editcategory/:id" element={<Editcategory/>}/> 
          <Route path="/orders" element={<Orders/>} />
          <Route path="/orderdetai/:id" element={<Oredrdetail/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
