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
import { createProduct } from "../services/products.service";
import ProductForm from "./product-form";

type AddProductDialogProps = {
  onSuccess?: () => void;
};

export default function AddProductDialog({ onSuccess }: AddProductDialogProps) {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (next) {
      setIsLoadingCategories(true);
      getCategories()
        .then(setCategories)
        .catch((e) => console.error(e))
        .finally(() => setIsLoadingCategories(false));
    }
  }

  async function handleSubmit(data: Parameters<typeof createProduct>[0]) {
    setIsSubmitting(true);
    try {
      await createProduct(data);
      setOpen(false);
      onSuccess?.();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger>
        <Button>
          <span className="icon-[hugeicons--plus]" />
          <span>Add Product</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
        </DialogHeader>
        {isLoadingCategories ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            Loading...
          </p>
        ) : (
          <ProductForm
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
