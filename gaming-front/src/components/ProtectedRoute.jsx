import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ currentUser, children }) => {
  if (currentUser === null || currentUser === undefined) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
