// routes.tsx

import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import SignIn from "../components/SignIn/SignIn";
import { PrivateRoute } from "./PrivateRoute";
import ServiceInfo from "../components/ServiceInfo/ServiceInfo";
import SignUp from "../components/SignUp/SignUp";
import UsersPanel from "../components/UsersPanel/UsersPanel";
import Profile from "../components/Profile/Profile";
import BaseProductsView from "../components/BaseProductsView/BaseProductsView";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/users" element={<UsersPanel />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/base-products" element={<BaseProductsView />} />
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
