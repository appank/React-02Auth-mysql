import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import AuthSuccess from "../pages/AuthSuccess";
import PrivateRoute from "../components/PrivateRoute";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/auth-success" element={<AuthSuccess />} />
    </Routes>
  );
}

export default AllRoutes;