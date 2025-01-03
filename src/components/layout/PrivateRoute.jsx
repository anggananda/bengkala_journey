import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import MainLayout from "./Main";
import { authStorage } from "../../utils/encryptStorage";
import { Spin } from "antd"; // Masih menggunakan komponen Spin dari Ant Design

const PrivateRoute = ({ component }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await authStorage.retrieveToken();
        if (token) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error retrieving token: broooo", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <Spin size="large" tip="Memuat..." className="mb-4" />{" "}
          {/* Spinner dari Ant Design */}
          <p className="text-lg font-semibold text-gray-700">
            Loading, please wait...
          </p>{" "}
          {/* Teks loading */}
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <MainLayout>{component}</MainLayout>;
};

export default PrivateRoute;
