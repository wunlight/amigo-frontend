import { useState } from "react";
import ProductCard from "../components/product-card";
import RestockDetails from "../components/restock-details";
import { useProducts } from "@/features/products/hooks/use-products";
import { createPurchase } from "@/features/purchases/services/purchases.service";

type SelectedProduct = {
  id: string;
  name: string;
  price: number;
  unit: string;
  stock: number;
};

function RestockView() {
  const { data: products = [], isLoading, isError } = useProducts();
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleIncrement = (productId: string) => {
    setSelectedProducts((prev) => {
      const existing = prev.find((p) => p.id === productId);
      const product = products.find((p) => p.id === productId);
      if (!product) return prev;

      if (existing) {
        return prev.map((p) =>
          p.id === productId ? { ...p, stock: p.stock + 1 } : p
        );
      }
      return [...prev, { id: productId, name: product.name, price: product.selling_price, unit: product.unit, stock: 1 }];
    });
  };

  const handleDecrement = (productId: string) => {
    setSelectedProducts((prev) => {
      const existing = prev.find((p) => p.id === productId);
      if (!existing) return prev;

      if (existing.stock <= 1) {
        return prev.filter((p) => p.id !== productId);
      }
      return prev.map((p) =>
        p.id === productId ? { ...p, stock: p.stock - 1 } : p
      );
    });
  };

  const getSelectedStock = (productId: string) => {
    return selectedProducts.find((p) => p.id === productId)?.stock || 0;
  };

  const totalRestock = selectedProducts.reduce((sum, p) => sum + p.price * p.stock, 0);

  const handleSubmit = async () => {
    if (selectedProducts.length === 0 || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const items = selectedProducts.map((p) => ({
        product_id: p.id,
        quantity: p.stock,
        unit_cost: p.price,
      }));
      await createPurchase(items);
      setSelectedProducts([]);
      alert("Restock purchase created successfully!");
    } catch (error) {
      console.error("Failed to create purchase:", error);
      alert("Failed to create purchase. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
              selectedStock={getSelectedStock(product.id)}
              onIncrement={() => handleIncrement(product.id)}
              onDecrement={() => handleDecrement(product.id)}
            />
          ))
        )}
      </div>

      <RestockDetails
        selectedProducts={selectedProducts}
        totalRestock={totalRestock}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

export default RestockView;
