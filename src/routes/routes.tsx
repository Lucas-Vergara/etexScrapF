// routes.tsx

import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import Login from "../components/Login/Login";
import { PrivateRoute } from "./PrivateRoute";
import ServiceInfo from "../components/ServiceInfo/ServiceInfo";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={<Navigate to="/login" replace={true} />}
      ></Route>
      <Route index element={<PrivateRoute element={<Dashboard />} />} />
      <Route
        path="/serviceInfo"
        element={<PrivateRoute element={<ServiceInfo />} />}
      />
    </Routes>
  );
};

export default AppRoutes;
