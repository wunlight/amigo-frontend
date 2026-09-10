import MainLayout from "@/layouts/main-layout";
import CashierPage from "@/pages/cashier-page";
import CategoriesPage from "@/pages/categories-page";
import ProductsPage from "@/pages/products-page";
import RestockPage from "@/pages/restock-page";
import { Route, Routes } from "react-router";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/cashier" element={<CashierPage />} />
        <Route path="/restock" element={<RestockPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
