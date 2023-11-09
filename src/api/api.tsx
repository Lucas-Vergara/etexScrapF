// api.tsx
const BASE_URL = process.env.REACT_APP_API_URL;

console.log(BASE_URL);

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
    const response = await fetch(`${BASE_URL}/product`);
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
    console.log("Respuesta del servidor:", products);
    return products;
  } catch (error) {
    console.error("Error al llamar al servidor:", error);
    throw error;
  }
};

export const runScript = async () => {
  try {
    const response = await fetch(`${BASE_URL}/ejecutar-script`);
    const data = await response.json();
    console.log("Respuesta del servidor:", data);
  } catch (error) {
    console.error("Error al llamar al servidor:", error);
  }
};

export const downloadExcel = async (): Promise<Blob> => {
  try {
    const response = await fetch(`${BASE_URL}/scrapData/download-excel`);

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
