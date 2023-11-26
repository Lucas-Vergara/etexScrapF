import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/routes";
import { useScrapingStore } from "./store/zustand";

const App: React.FC = () => {
  const {
    fetchProducts,
    fetchScrapingTracker,
    fetchMonthlyMissingProducts,
    fetchDailyMissingProducts,
    authenticated,
  } = useScrapingStore();

  useEffect(() => {
    if (authenticated) {
      fetchProducts();
      fetchScrapingTracker();
      fetchMonthlyMissingProducts();
      fetchDailyMissingProducts();
    }
  }, [
    authenticated,
    fetchProducts,
    fetchScrapingTracker,
    fetchMonthlyMissingProducts,
    fetchDailyMissingProducts,
  ]);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
