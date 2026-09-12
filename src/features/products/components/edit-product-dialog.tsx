import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getCategories } from "@/features/categories/services/categories.service";
import type { Category } from "@/features/categories/types/categories.type";
import { useState } from "react";
import { getProduct, updateProduct } from "../services/products.service";
import type { CreateProductRequest } from "../types/products.type";
import ProductForm from "./product-form";

type EditProductDialogProps = {
  productId: string;
  onSuccess?: () => void;
};

export default function EditProductDialog({
  productId,
  onSuccess,
}: EditProductDialogProps) {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [initialValue, setInitialValue] = useState<
    CreateProductRequest | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (next) {
      setIsLoading(true);
      Promise.all([getCategories(), getProduct(productId)])
        .then(([cats, product]) => {
          setCategories(cats);
          setInitialValue({
            category_id: product.category_id,
            name: product.name,
            sku: product.sku,
            unit: product.unit,
            selling_price: product.selling_price,
            minimum_stock: product.minimum_stock,
          });
        })
        .catch((e) => console.error(e))
        .finally(() => setIsLoading(false));
    } else {
      setInitialValue(undefined);
    }
  }

  async function handleSubmit(data: CreateProductRequest) {
    setIsSubmitting(true);
    try {
      await updateProduct(productId, data);
      setOpen(false);
      onSuccess?.();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger>
        <Button variant="secondary" size="icon">
          <span className="icon-[hugeicons--pencil-edit-02]" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            Loading...
          </p>
        ) : (
          <ProductForm
            key={open ? productId : "closed"}
            initialValue={initialValue}
            categories={categories}
            onSubmit={handleSubmit}
            onCancel={() => setOpen(false)}
            isLoading={isSubmitting}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
