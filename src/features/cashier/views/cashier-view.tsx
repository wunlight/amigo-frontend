import ProductCard from "../components/product-card";
import SaleDetails from "../components/sale-details";
import { useProducts } from "@/features/products/hooks/use-products";

function CashierView() {
  const { data: products = [], isLoading, isError } = useProducts();

  return (
    <div className="flex gap-3 h-full">
      <div className="grid grid-cols-2 gap-3 p-3 min-h-0 h-fit max-h-full w-full overflow-auto">
        {isLoading ? (
          <div className="col-span-2 text-center py-8 text-zinc-500">Loading products...</div>
        ) : isError ? (
          <div className="col-span-2 text-center py-8 text-red-500">Failed to load products</div>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.selling_price}
              unit={product.unit}
              stocks={product.minimum_stock}
            />
          ))
        )}
      </div>

      <SaleDetails />
    </div>
  );
}

export default CashierView;
