import CategoriesPage from "@/pages/categories-page";
import ProductsPage from "@/pages/products-page";
import { Route, Routes } from "react-router";

function Router() {
  return (
    <Routes>
      <Route path="/" />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/products" element={<ProductsPage />} />
    </Routes>
  );
}

export default Router;
