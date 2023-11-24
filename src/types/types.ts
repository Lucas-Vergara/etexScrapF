export interface Product {
  _id: string;
  name: string;
  brand: string;
  distributor: string;
  category: string;
  sku: string;
  price: number;
  date: string;
  day: string;
  month: string;
  year: string;
  region: string;
}

export interface ScrapingTracker {
  status: "completed",
  started: "2023-11-24T07:21:19.628Z",
  completed: "2023-11-24T07:35:50.943Z",
  progress: "finished",
  initiator: "Servidor",
  errorMessage: null,
  missingProducts: [],
  productsAmount: 211,
}
