import { BaseProduct, Product } from "../types/types";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const accessToken = localStorage.getItem("access_token");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    const response = await fetch(`${BASE_URL}/product`, {
      headers: myHeaders,
    });
    const data = await response.json();
    const products: Product[] = data.map((item: any) => ({
      _id: item._id,
      date: item.date,
      day: item.day,
      month: item.month,
      year: item.year,
      name: item.name,
      brand: item.brand,
      distributor: item.distributor,
      category: item.category,
      web_title: item.web_title,
      sku: item.sku,
      presence: item.presence,
      price: item.price,
      region: item.region,
    }));
    return products;
  } catch (error) {
    console.error("Error al llamar al servidor:", error);
    throw error;
  }
};

export const fetchBaseProducts = async (): Promise<BaseProduct[]> => {
  try {
    const accessToken = localStorage.getItem("access_token");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    const response = await fetch(`${BASE_URL}/product/base_products`, {
      headers: myHeaders,
    });
    const data = await response.json();
    const baseProducts: BaseProduct[] = data.map((item: any) => ({
      _id: item._id,
      name: item.name,
      brand: item.brand,
      distributor: item.distributor,
      sku: item.sku,
      category: item.category,
      region: item.region,
    }));
    return baseProducts;
  } catch (error) {
    console.error("Error al llamar al servidor:", error);
    throw error;
  }
};

export const fetchScrapingTracker = async () => {
  try {
    const accessToken = localStorage.getItem("access_token");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    const response = await fetch(`${BASE_URL}/last-tracker`, {
      headers: myHeaders,
    });
    return await response.json();
  } catch (error) {
    console.error("Error al llamar al servidor:", error);
    throw error;
  }
};

export const fetchDailyMissingProducts = async () => {
  try {
    const accessToken = localStorage.getItem("access_token");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    const response = await fetch(`${BASE_URL}/daily-missing-products`, {
      headers: myHeaders,
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Error al llamar al servidor:", error);
    throw error;
  }
};

export const fetchMonthlyMissingProducts = async () => {
  try {
    const accessToken = localStorage.getItem("access_token");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    const response = await fetch(`${BASE_URL}/monthly-missing-products`, {
      headers: myHeaders,
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Error al llamar al servidor:", error);
    throw error;
  }
};

export const runScript = async () => {
  try {
    const accessToken = localStorage.getItem("access_token");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    const response = await fetch(`${BASE_URL}/ejecutar-script`, {
      headers: myHeaders,
    });
    await response.json();
  } catch (error) {
    console.error("Error al llamar al servidor:", error);
  }
};

export const downloadExcel = async (): Promise<Blob> => {
  try {
    const accessToken = localStorage.getItem("access_token");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    const response = await fetch(`${BASE_URL}/download-excel`, {
      headers: myHeaders,
    });

    if (response.ok) {
      // Convierte la respuesta a un blob (formato binario)
      const blob = await response.blob();
      return blob;
    } else {
      throw new Error(`Error en la descarga: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error al llamar al servidor:", error);
    throw error;
  }
};

export const login = async (
  formData: FormData
): Promise<{ access_token: string }> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      if (response.status === 401) {
        throw new AuthenticationError("Credenciales incorrectas");
      } else {
        throw new Error(`Error al iniciar sesión: ${response.statusText}`);
      }
    }
  } catch (error) {
    throw error;
  }
};

export const validateToken = async () => {
  try {
    const accessToken = localStorage.getItem("access_token");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    const req = await fetch(`${BASE_URL}/auth/check`, {
      headers: myHeaders,
    });

    if (!req.ok) {
      throw new Error(`Error en la solicitud: ${req.statusText}`);
    }

    const response = await req.json();

    return { authenticated: response.authenticated, message: response.message };
  } catch (error) {
    return {
      authenticated: false,
      message: error,
    };
  }
};

export const register = async (
  formData: FormData
): Promise<{
  email: string;
  password: string;
  _id: string;
  __v: number;
}> => {
  try {
    var myHeaders = new Headers();
    const accessToken = localStorage.getItem("access_token");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`${response.statusText}`);
    }
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userId: string): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // Puedes incluir tokens de autenticación u otros encabezados si es necesario
      },
    });

    if (!response.ok) {
      throw new Error(`${response.statusText}`);
    }
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchCurrentUser = async () => {
  try {
    const accessToken = localStorage.getItem("access_token");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    const req = await fetch(`${BASE_URL}/auth/user`, {
      headers: myHeaders,
    });
    if (!req.ok) {
      throw new Error(`Error en la solicitud: ${req.statusText}`);
    }
    const response = await req.json();
    return response;
  } catch (error) {
    return {
      authenticated: false,
      message: error,
    };
  }
};

export const fetchUsers = async (): Promise<
  { id: string; email: string }[]
> => {
  try {
    const accessToken = localStorage.getItem("access_token");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    const response = await fetch(`${BASE_URL}/users`, {
      headers: myHeaders,
    });
    const users = await response.json();
    return users;
  } catch (error) {
    console.error("Error al llamar al servidor:", error);
    throw error;
  }
};

export const changePassword = async (formData: FormData): Promise<string> => {
  try {
    const accessToken = localStorage.getItem("access_token");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${accessToken}`);

    const response = await fetch(`${BASE_URL}/auth/change-password`, {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify({
        newPassword: formData.get("password"),
      }),
    });

    if (!response.ok) {
      throw new Error(`Error al cambiar la contraseña: ${response.statusText}`);
    }
    const responseText = await response.text();
    return responseText;
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error);
    throw error;
  }
};

export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthenticationError";
  }
}
