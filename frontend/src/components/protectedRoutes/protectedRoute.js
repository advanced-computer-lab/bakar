import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const token = localStorage.getItem("token");
  let isAuthenticated;
  if (token == null) {
    isAuthenticated = false;
  } else {
    isAuthenticated = true;
  }
  console.log("this", isAuthenticated);

  return (
    isAuthenticated ?
      <Outlet path="/profile"/> :  <Navigate to="/login" />
  );
}

export default ProtectedRoute;
