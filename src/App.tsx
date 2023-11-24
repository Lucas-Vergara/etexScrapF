import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/routes";
import { useScrapingStore } from "./store/zustand";

const App: React.FC = () => {
  const { fetchProducts, fetchScrapingTracker, fetchMissingProducts } =
    useScrapingStore();

  useEffect(() => {
    fetchProducts();
    fetchScrapingTracker();
    fetchMissingProducts();
  }, []);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
