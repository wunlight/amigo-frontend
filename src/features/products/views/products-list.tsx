import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProductsTable from "../components/products-table";
import { useProducts } from "../hooks/use-products";

function ProductsList() {
  const { data: products = [], isFetching, isError, refetch } = useProducts();

  return (
    <div className="p-4">
      <Card>
        <CardContent>
          <div className="flex justify-end">
            <Button>
              <span className="icon-[hugeicons--plus]" />
              <span>Add Product</span>
            </Button>
          </div>

          <ProductsTable
            products={products}
            isLoading={isFetching}
            isError={isError}
          />

          <div className="flex justify-end">
            <Button size="icon" onClick={() => refetch()}>
              <span className="icon-[hugeicons--refresh-04]" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductsList;
