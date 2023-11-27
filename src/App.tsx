import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/routes";
import { useProductStore } from "./store/ProductStore";
import { useUserStore } from "./store/UserStore";

const App: React.FC = () => {
  const {
    fetchProducts,
    fetchScrapingTracker,
    fetchMonthlyMissingProducts,
    fetchDailyMissingProducts,
  } = useProductStore();

  const { authenticated, fetchUsers } = useUserStore();

  useEffect(() => {
    if (authenticated) {
      fetchProducts();
      fetchScrapingTracker();
      fetchMonthlyMissingProducts();
      fetchDailyMissingProducts();
      fetchUsers();
    }
  }, [
    authenticated,
    fetchProducts,
    fetchScrapingTracker,
    fetchMonthlyMissingProducts,
    fetchDailyMissingProducts,
    fetchUsers,
  ]);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
