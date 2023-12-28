import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import {
  BaseProduct,
  DailyMissingProducts,
  MonthlyMissingProducts,
  Product,
  ScrapingTracker,
} from "../types/types";
import {
  fetchProducts,
  fetchBaseProducts,
  fetchScrapingTracker,
  fetchDailyMissingProducts,
  fetchMonthlyMissingProducts,
} from "../api/api";

interface ProductState {
  products: Product[];
  baseProducts: BaseProduct[];
  isLoading: boolean;
  error: any | null;
  fetchProducts: () => Promise<void>;
  fetchBaseProducts: () => Promise<void>;
  productsAmount: number;
  scrapingTracker: ScrapingTracker | null;
  fetchScrapingTracker: () => Promise<void>;
  fetchDailyMissingProducts: () => Promise<void>;
  dailyMissingProducts: DailyMissingProducts[];
  fetchMonthlyMissingProducts: () => Promise<void>;
  monthlyMissingProducts: MonthlyMissingProducts[];
  addBaseProduct: (newProduct: BaseProduct) => void;
  editBaseProduct: (newProduct: BaseProduct) => void;
  deleteBaseProduct: (productId: string) => void;
}

export const useProductStore = create<ProductState>()(
  devtools(
    persist(
      (set) => ({
        products: [],
        baseProducts: [],
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
        fetchBaseProducts: async () => {
          try {
            set({ isLoading: true, error: null });
            const baseProducts = await fetchBaseProducts();
            const productsAmount = baseProducts.length;
            set({ baseProducts, isLoading: false, productsAmount });
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
        addBaseProduct: (newProduct: BaseProduct) => {
          set((state) => ({
            baseProducts: [...state.baseProducts, newProduct],
          }));
        },
        editBaseProduct: (updatedProduct: BaseProduct) => {
          set((state) => ({
            baseProducts: state.baseProducts.map((product) =>
              product._id === updatedProduct._id ? updatedProduct : product
            ),
          }));
        },
        deleteBaseProduct: (productId: string) => {
          set((state) => ({
            baseProducts: state.baseProducts.filter(
              (product) => product._id !== productId
            ),
          }));
        },
      }),
      { name: "productStore" }
    )
  )
);
