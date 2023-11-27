import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import {
  DailyMissingProducts,
  MonthlyMissingProducts,
  Product,
  ScrapingTracker,
} from "../types/types";
import {
  fetchProducts,
  fetchScrapingTracker,
  fetchDailyMissingProducts,
  fetchMonthlyMissingProducts,
} from "../api/api";

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: any | null;
  fetchProducts: () => Promise<void>;
  productsAmount: number;
  scrapingTracker: ScrapingTracker | null;
  fetchScrapingTracker: () => Promise<void>;
  fetchDailyMissingProducts: () => Promise<void>;
  dailyMissingProducts: DailyMissingProducts[];
  fetchMonthlyMissingProducts: () => Promise<void>;
  monthlyMissingProducts: MonthlyMissingProducts[];
}

export const useProductStore = create<ProductState>()(
  devtools(
    persist(
      (set) => ({
        products: [],
        isLoading: false,
        error: null,
        productsAmount: 0,
        scrapingTracker: null,
        dailyMissingProducts: [],
        monthlyMissingProducts: [],
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
        fetchDailyMissingProducts: async () => {
          try {
            const dailyMissingProducts = await fetchDailyMissingProducts();
            set({ dailyMissingProducts });
          } catch (error) {}
        },
        fetchMonthlyMissingProducts: async () => {
          try {
            const monthlyMissingProducts = await fetchMonthlyMissingProducts();
            set({ monthlyMissingProducts });
          } catch (error) {}
        },
      }),
      { name: "productStore" }
    )
  )
);
