import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Product, ScrapingTracker } from "../types/types";
import {
  fetchProducts,
  fetchScrapingTracker,
  fetchMissingProducts,
} from "../api/api";

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: any | null;
  fetchProducts: () => Promise<void>;
  productsAmount: number;
  scrapingTracker: ScrapingTracker | null;
  fetchScrapingTracker: () => Promise<void>;
  missingProducts: string[] | null;
  fetchMissingProducts: () => Promise<void>;
  authenticated: boolean | null;
  setAuthenticated: (value: boolean) => void;
}

export const useScrapingStore = create<ProductState>()(
  devtools(
    persist(
      (set) => ({
        products: [],
        isLoading: false,
        error: null,
        productsAmount: 0,
        scrapingTracker: null,
        missingProducts: null,
        authenticated: null,
        setAuthenticated: (value) => set({ authenticated: value }),
        fetchProducts: async () => {
          try {
            set({ isLoading: true, error: null });
            const products = await fetchProducts();
            const productsAmount = products.length;
            set({ products, isLoading: false, productsAmount });
          } catch (error) {
            set({ error, isLoading: false });
          }
        },

        fetchScrapingTracker: async () => {
          try {
            const scrapingTracker = await fetchScrapingTracker();
            set({ scrapingTracker });
          } catch (error) {}
        },
        fetchMissingProducts: async () => {
          try {
            const missingProducts = await fetchMissingProducts();
            set({ missingProducts });
          } catch (error) {}
        },
      }),
      { name: "scrapingServiceStore" }
    )
  )
);
