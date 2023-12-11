import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/routes";
import { useProductStore } from "./store/ProductStore";
import { useUserStore } from "./store/UserStore";

const App: React.FC = () => {
  const {
    fetchProducts,
    fetchBaseProducts,
    fetchScrapingTracker,
    fetchMonthlyMissingProducts,
    fetchDailyMissingProducts,
  } = useProductStore();

  const { authenticated, fetchUsers, fetchCurrentUser } = useUserStore();

  useEffect(() => {
    if (authenticated) {
      fetchProducts();
      fetchBaseProducts();
      fetchScrapingTracker();
      fetchMonthlyMissingProducts();
      fetchDailyMissingProducts();
      fetchUsers();
      fetchCurrentUser();
    }
  }, [
    authenticated,
    fetchProducts,
    fetchBaseProducts,
    fetchScrapingTracker,
    fetchMonthlyMissingProducts,
    fetchDailyMissingProducts,
    fetchUsers,
    fetchCurrentUser,
  ]);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
