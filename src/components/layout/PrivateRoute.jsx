import React from "react";
import { Navigate } from "react-router-dom";
import MainLayout from "./Main";
import useAuth from "../../store/useAuth";

const PrivateRoute = ({ component }) => {
  const isLogin = useAuth((state) => state.auth.login);

  if (!isLogin) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  // Render the component inside MainLayout if authenticated
  return <MainLayout>{component}</MainLayout>;
};

export default PrivateRoute;
