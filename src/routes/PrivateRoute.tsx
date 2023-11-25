import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { validateToken } from "../api/api";
import { useScrapingStore } from "../store/zustand";

interface PrivateRouteProps {
  element: React.ReactElement;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const { authenticated, setAuthenticated } = useScrapingStore();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await validateToken();
        if (response.authenticated) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch (error) {
        console.error("Error al validar el token:", error);
        setAuthenticated(false);
      }
    };
    !authenticated && checkAuthentication();
  }, [authenticated, setAuthenticated]);

  if (authenticated === null) {
    return <div>Cargando...</div>;
  }

  return authenticated ? (
    React.cloneElement(element)
  ) : (
    <Navigate to="/login" replace={true} />
  );
};
