import { useProducts } from "@/features/products/hooks/use-products";
import { createSale } from "@/features/sales/services/sales.service";
import { useServices } from "@/features/services/hooks/use-services";
import { useState } from "react";
import ProductCard from "../components/product-card";
import SaleDetails from "../components/sale-details";
import ServiceCard from "../components/service-card";

type SelectedProduct = {
  id: string;
  name: string;
  price: number;
  unit: string;
  stock: number;
};

type SelectedService = {
  id: string;
  name: string;
  price: number;
};

function CashierView() {
  const { data: products = [], isLoading, isError } = useProducts();
  const {
    data: services = [],
    isLoading: servicesLoading,
    isError: servicesError,
  } = useServices();
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    [],
  );
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>(
    [],
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleIncrement = (productId: string) => {
    setSelectedProducts((prev) => {
      const existing = prev.find((p) => p.id === productId);
      const product = products.find((p) => p.id === productId);
      if (!product) return prev;

      if (existing) {
        if (existing.stock >= product.minimum_stock) return prev;
        return prev.map((p) =>
          p.id === productId ? { ...p, stock: p.stock + 1 } : p,
        );
      }
      return [
        ...prev,
        {
          id: productId,
          name: product.name,
          price: product.selling_price,
          unit: product.unit,
          stock: 1,
        },
      ];
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
        p.id === productId ? { ...p, stock: p.stock - 1 } : p,
      );
    });
  };

  const getSelectedStock = (productId: string) => {
    return selectedProducts.find((p) => p.id === productId)?.stock || 0;
  };

  const isServiceSelected = (serviceId: string) => {
    return selectedServices.some((s) => s.id === serviceId);
  };

  const handleToggleService = (serviceId: string) => {
    setSelectedServices((prev) => {
      const existing = prev.find((s) => s.id === serviceId);
      if (existing) {
        return prev.filter((s) => s.id !== serviceId);
      }
      const service = services.find((s) => s.id === serviceId);
      if (!service) return prev;
      return [
        ...prev,
        { id: serviceId, name: service.name, price: service.default_price },
      ];
    });
  };

  const productsTotal = selectedProducts.reduce(
    (sum, p) => sum + p.price * p.stock,
    0,
  );
  const servicesTotal = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const totalSale = productsTotal + servicesTotal;

  const handleSubmit = async () => {
    if (
      (selectedProducts.length === 0 && selectedServices.length === 0) ||
      isSubmitting
    )
      return;

    setIsSubmitting(true);
    try {
      const productItems = selectedProducts.map((p) => ({
        product_id: p.id,
        quantity: p.stock,
        unit_price: p.price,
        unit_cost: p.price,
      }));
      const serviceItems = selectedServices.map((s) => ({
        service_id: s.id,
        unit_price: s.price,
      }));
      await createSale(productItems, serviceItems);
      setSelectedProducts([]);
      setSelectedServices([]);
      alert("Sale created successfully!");
    } catch (error) {
      console.error("Failed to create sale:", error);
      alert("Failed to create sale. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex gap-3 h-full">
      <div className="grid grid-cols-2 gap-3 p-3 min-h-0 h-fit max-h-full w-full overflow-auto">
        <div className="col-span-2 pt-4">
          <h6 className="font-semibold text-lg mb-3">Products</h6>
        </div>
        {isLoading ? (
          <div className="col-span-2 text-center py-8 text-zinc-500">
            Loading products...
          </div>
        ) : isError ? (
          <div className="col-span-2 text-center py-8 text-red-500">
            Failed to load products
          </div>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.selling_price}
              unit={product.unit}
              stocks={product.current_stock}
              selectedStock={getSelectedStock(product.id)}
              onIncrement={() => handleIncrement(product.id)}
              onDecrement={() => handleDecrement(product.id)}
            />
          ))
        )}

        <div className="col-span-2 pt-4">
          <h6 className="font-semibold text-lg mb-3">Services</h6>
        </div>
        {servicesLoading ? (
          <div className="col-span-2 text-center py-8 text-zinc-500">
            Loading services...
          </div>
        ) : servicesError ? (
          <div className="col-span-2 text-center py-8 text-red-500">
            Failed to load services
          </div>
        ) : (
          services.map((service) => (
            <ServiceCard
              key={service.id}
              name={service.name}
              defaultPrice={service.default_price}
              isSelected={isServiceSelected(service.id)}
              onToggle={() => handleToggleService(service.id)}
            />
          ))
        )}
      </div>

      <SaleDetails
        selectedProducts={selectedProducts}
        selectedServices={selectedServices}
        totalSale={totalSale}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

export default CashierView;
