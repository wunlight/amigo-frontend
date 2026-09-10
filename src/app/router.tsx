import MainLayout from "@/layouts/main-layout";
import CategoriesPage from "@/pages/categories-page";
import ProductsPage from "@/pages/products-page";
import PurchasesPage from "@/pages/purchases-page";
import { Route, Routes } from "react-router";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/purchases" element={<PurchasesPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
