import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Product } from "../types/products.type";

type ProductsTableProps = {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
};

function ProductTableBody({
  products,
  isLoading,
  isError,
}: ProductsTableProps) {
  if (isLoading) {
    return (
      <TableRow>
        <TableCell colSpan={2} className="h-24 text-center">
          Loading products...
        </TableCell>
      </TableRow>
    );
  }

  if (isError) {
    return (
      <TableRow>
        <TableCell colSpan={2} className="h-24 text-center">
          Failed to load products.
        </TableCell>
      </TableRow>
    );
  }

  if (products.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={2} className="h-24 text-center">
          No products found.
        </TableCell>
      </TableRow>
    );
  }

  return products.map((product) => (
    <TableRow key={product.id}>
      <TableCell>{product.name}</TableCell>
      <TableCell>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" size="icon">
            <span className="icon-[hugeicons--pencil-edit-02]" />
          </Button>

          <Button variant="destructive" size="icon">
            <span className="icon-[hugeicons--delete-02]" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  ));
}

function ProductsTable({ products, isLoading, isError }: ProductsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <ProductTableBody
          products={products}
          isLoading={isLoading}
          isError={isError}
        />
      </TableBody>
    </Table>
  );
}

export default ProductsTable;
