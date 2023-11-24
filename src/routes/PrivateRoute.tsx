import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { validateToken } from "../api/api";

interface PrivateRouteProps {
  element: React.ReactElement;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await validateToken();
        if (response.authenticated) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error al validar el token:", error);
        setIsAuthenticated(false);
      }
    };
    checkAuthentication();
  }, []);

  if (isAuthenticated === null) {
    return <div>Cargando...</div>;
  }

  return isAuthenticated ? (
    React.cloneElement(element)
  ) : (
    <Navigate to="/login" replace={true} />
  );
};
