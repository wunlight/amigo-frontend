import CategoriesPage from "@/pages/categories-page";
import { Route, Routes } from "react-router";

function Router() {
  return (
    <Routes>
      <Route path="/" />
      <Route path="/categories" element={<CategoriesPage />} />
    </Routes>
  );
}

export default Router;
