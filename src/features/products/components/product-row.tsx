import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import type { Product } from "../types/products.type";
import DeleteProductDialog from "./delete-product-dialog";

type ProductRowProps = {
  product: Product;
  onDelete: () => Promise<void>;
};

function ProductRow({ product, onDelete }: ProductRowProps) {
  return (
    <TableRow key={product.id}>
      <TableCell>{product.name}</TableCell>
      <TableCell>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" size="icon">
            <span className="icon-[hugeicons--pencil-edit-02]" />
          </Button>

          <DeleteProductDialog productName={product.name} onDelete={onDelete} />
        </div>
      </TableCell>
    </TableRow>
  );
}

export default ProductRow;
