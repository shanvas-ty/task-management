// Updated ProtectedRoute.jsx to Trigger Refresh When Token Expires
// Now, ProtectedRoute can handle token expiration and refresh it using AuthContext

import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthorized, checkAuthorization } =
    useContext(AuthContext);

  // Check authorization when the component mounts
  useEffect(() => {
    checkAuthorization();
  }, [checkAuthorization]);

  // If not authorized, redirect to login
  if (isAuthorized) {
    return children;
  }
  return <Navigate to="/login" />;
};

export default ProtectedRoute;
