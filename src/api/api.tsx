const BASE_URL = process.env.REACT_APP_BASE_URL;

interface Product {
  _id: string;
  name: string;
  brand: string;
  distributor: string;
  sku: string;
  price: number;
  date: string;
}

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
      hour: item.hour,
      name: item.name,
      brand: item.brand,
      distributor: item.distributor,
      web_title: item.web_title,
      sku: item.sku,
      presence: item.presence,
      price: item.price,
    }));
    return products;
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
    const data = await response.json();
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

export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthenticationError";
  }
}
