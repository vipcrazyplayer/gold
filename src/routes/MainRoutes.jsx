import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "../components/Register";
import Login from "../components/Login";
import ProductList from "../components/products/ProductList";
import AddProduct from "../components/products/AddProduct";
import Details from "../components/products/Details";
import EditProduct from "../components/products/EditProduct";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProductList />} />
      <Route path="/add" element={<AddProduct />} />
      <Route path="/details/:id" element={<Details />} />
      <Route path="/edit/:id" element={<EditProduct />} />
    </Routes>
  );
};

export default MainRoutes;
