import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Product } from "../types/products.type";
import ProductRow from "./product-row";

type ProductsTableProps = {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
};

function ProductsTable({
  products,
  isLoading,
  isError,
  refetch,
}: ProductsTableProps) {
  async function handleDelete(id: string) {
    console.log(id);
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>
            <div className="flex justify-end">
              <span>Actions</span>
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {isLoading && (
          <TableRow>
            <TableCell colSpan={2} className="h-24 text-center">
              Loading products...
            </TableCell>
          </TableRow>
        )}

        {!isLoading && isError && (
          <TableRow>
            <TableCell colSpan={2} className="h-24 text-center">
              Failed to load products.
            </TableCell>
          </TableRow>
        )}

        {!isLoading && !isError && products.length === 0 && (
          <TableRow>
            <TableCell colSpan={2} className="h-24 text-center">
              No products found.
            </TableCell>
          </TableRow>
        )}

        {!isLoading &&
          !isError &&
          products.map((product) => (
            <ProductRow
              key={product.id}
              product={product}
              onDelete={() => handleDelete(product.id)}
              onSuccess={refetch}
            />
          ))}
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>
            <div className="flex justify-end">
              <Button size="icon" onClick={() => refetch()}>
                <span className="icon-[hugeicons--refresh-04]" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export default ProductsTable;
