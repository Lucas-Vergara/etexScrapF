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
  format: string;
}

export interface BaseProduct {
  _id: string;
  name: string;
  brand: string;
  distributor: string;
  sku: string;
  category: string;
  region: string;
  format: string;
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

export interface MonthlyMissingProducts {
  day: string;
  missingProducts: DailyMissingProducts[]
}

export interface DailyMissingProducts {
  product: string;
  product_url: string;
}

export interface MissingProductsDialogProps {
  open: boolean;
  onClose: () => void;
  data: MonthlyMissingProducts[] | DailyMissingProducts[];
}
