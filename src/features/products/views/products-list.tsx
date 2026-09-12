import { Card, CardContent } from "@/components/ui/card";
import AddProductDialog from "../components/add-product-dialog";
import ProductsTable from "../components/products-table";
import { useProducts } from "../hooks/use-products";

function ProductsList() {
  const { data: products = [], isFetching, isError, refetch } = useProducts();

  return (
    <div className="p-4">
      <Card>
        <CardContent>
          <div className="flex justify-end mb-3">
            <AddProductDialog onSuccess={refetch} />
          </div>

          <ProductsTable
            products={products}
            isLoading={isFetching}
            isError={isError}
            refetch={refetch}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductsList;
