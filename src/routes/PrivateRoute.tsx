import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { validateToken } from "../api/api";
import { useUserStore } from "../store/UserStore";

interface PrivateRouteProps {
  element: React.ReactElement;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const { authenticated, setAuthenticated } = useUserStore();

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
    checkAuthentication();
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
