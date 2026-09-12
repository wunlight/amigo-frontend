import { TableCell, TableRow } from "@/components/ui/table";
import type { Product } from "../types/products.type";
import DeleteProductDialog from "./delete-product-dialog";
import EditProductDialog from "./edit-product-dialog";

type ProductRowProps = {
  product: Product;
  onDelete: () => Promise<void>;
  onSuccess?: () => void;
};

function ProductRow({ product, onDelete, onSuccess }: ProductRowProps) {
  return (
    <TableRow key={product.id}>
      <TableCell>{product.name}</TableCell>
      <TableCell>
        <div className="flex justify-end gap-3">
          <EditProductDialog productId={product.id} onSuccess={onSuccess} />
          <DeleteProductDialog productName={product.name} onDelete={onDelete} />
        </div>
      </TableCell>
    </TableRow>
  );
}

export default ProductRow;
