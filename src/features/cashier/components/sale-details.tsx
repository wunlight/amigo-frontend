import { Button } from "@/components/ui/button";

type SaleDetailsProps = {
  selectedProducts: Array<{
    id: string;
    name: string;
    price: number;
    unit: string;
    stock: number;
  }>;
  selectedServices: Array<{ id: string; name: string; price: number }>;
  totalSale: number;
  onSubmit: () => void;
  isSubmitting: boolean;
};

function SaleDetails({
  selectedProducts,
  selectedServices,
  totalSale,
  onSubmit,
  isSubmitting,
}: SaleDetailsProps) {
  const productsTotal = selectedProducts.reduce((sum, s) => sum + s.price, 0);
  const servicesTotal = selectedServices.reduce((sum, s) => sum + s.price, 0);

  return (
    <div className="flex flex-col gap-3 p-4 shrink-0 h-full w-80 bg-zinc-50">
      <h6 className="font-semibold text-xl">Sale Details</h6>
      <hr />
      <div className="flex flex-col gap-3 py-3 min-h-0 max-h-full overflow-auto">
        <div className="flex flex-col gap-1.5">
          <h6 className="text-sm text-zinc-500">Products</h6>
          {selectedProducts.length === 0 ? (
            <div className="text-sm text-zinc-500 text-center py-4">
              No products selected
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {selectedProducts.map((product) => (
                <div key={product.id} className="flex flex-col gap-1">
                  <div className="flex justify-between text-sm">
                    <span>{product.name}</span>
                    <span>
                      Rp. {(product.price * product.stock).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-zinc-500">
                    <span>
                      {product.stock} x {product.unit} @ Rp.{" "}
                      {product.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* {selectedProducts.length > 0 && (
          <div className="flex justify-between pt-1.5 text-sm font-medium border-t border-zinc-300">
            <span>Products Total</span>
            <span>Rp. {productsTotal.toLocaleString()}</span>
          </div>
        )} */}

        <hr />

        <div className="flex flex-col gap-1.5">
          <h6 className="text-sm text-zinc-500">Services</h6>
          {selectedServices.length === 0 ? (
            <div className="text-sm text-zinc-500 text-center py-4">
              No services selected
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {selectedServices.map((service) => (
                <div key={service.id} className="flex flex-col gap-1">
                  <div className="flex justify-between text-sm">
                    <span>{service.name}</span>
                    <span>Rp. {service.price.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* {selectedServices.length > 0 && (
          <div className="flex justify-between pt-1.5 text-sm font-medium border-t border-zinc-300">
            <span>Services Total</span>
            <span>Rp. {servicesTotal.toLocaleString()}</span>
          </div>
        )} */}
      </div>
      <hr className="mt-auto" />
      <div className="flex flex-col gap-1 5">
        <div className="flex justify-between">
          <span>Products Total</span>
          <span>Rp. {productsTotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Service Total</span>
          <span>Rp. {servicesTotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>Rp. {totalSale.toLocaleString()}</span>
        </div>
      </div>
      <Button
        disabled={
          (selectedProducts.length === 0 && selectedServices.length === 0) ||
          isSubmitting
        }
        onClick={onSubmit}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </div>
  );
}

export default SaleDetails;
