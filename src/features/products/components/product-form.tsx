import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "cn";
import type { Category } from "@/features/categories/types/categories.type";
import type { CreateProductRequest } from "../types/products.type";

type ProductFormProps = {
  initialValue?: Partial<CreateProductRequest>;
  categories: Category[];
  onSubmit: (data: CreateProductRequest) => void;
  onCancel: () => void;
  isLoading?: boolean;
};

export default function ProductForm({
  initialValue,
  categories,
  onSubmit,
  onCancel,
  isLoading = false,
}: ProductFormProps) {
  const [formData, setFormData] = useState<CreateProductRequest>(() => ({
    category_id: initialValue?.category_id ?? "",
    name: initialValue?.name ?? "",
    sku: initialValue?.sku ?? "",
    unit: initialValue?.unit ?? "",
    selling_price: initialValue?.selling_price ?? 0,
    minimum_stock: initialValue?.minimum_stock ?? 0,
  }));

  const [errors, setErrors] = useState<Partial<Record<keyof CreateProductRequest, string>>>({});

  const [prevInitialValue, setPrevInitialValue] = useState(initialValue);
  if (initialValue !== prevInitialValue) {
    setPrevInitialValue(initialValue);
    setFormData({
      category_id: initialValue?.category_id ?? "",
      name: initialValue?.name ?? "",
      sku: initialValue?.sku ?? "",
      unit: initialValue?.unit ?? "",
      selling_price: initialValue?.selling_price ?? 0,
      minimum_stock: initialValue?.minimum_stock ?? 0,
    });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    const newValue = type === "number" ? Number(value) : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    if (errors[name as keyof CreateProductRequest]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function validate(): boolean {
    const newErrors: Partial<Record<keyof CreateProductRequest, string>> = {};
    if (!formData.category_id) newErrors.category_id = "Category is required";
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.sku.trim()) newErrors.sku = "SKU is required";
    if (!formData.unit.trim()) newErrors.unit = "Unit is required";
    if (formData.selling_price <= 0) newErrors.selling_price = "Selling price must be greater than 0";
    if (formData.minimum_stock < 0) newErrors.minimum_stock = "Minimum stock cannot be negative";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="category_id" className="text-sm font-medium">
          Category
        </label>
        <select
          id="category_id"
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          className={cn(
            "h-9 w-full min-w-0 rounded-4xl border border-input bg-input/30 px-3 py-1 text-base transition-colors outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
            errors.category_id && "border-destructive"
          )}
          disabled={isLoading}
        >
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        {errors.category_id && <p className="text-sm text-destructive">{errors.category_id}</p>}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Product name" disabled={isLoading} aria-invalid={!!errors.name} />
        {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="sku" className="text-sm font-medium">
          SKU
        </label>
        <Input id="sku" name="sku" value={formData.sku} onChange={handleChange} placeholder="SKU code" disabled={isLoading} aria-invalid={!!errors.sku} />
        {errors.sku && <p className="text-sm text-destructive">{errors.sku}</p>}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="unit" className="text-sm font-medium">
          Unit
        </label>
        <Input id="unit" name="unit" value={formData.unit} onChange={handleChange} placeholder="e.g., pcs, box, kg" disabled={isLoading} aria-invalid={!!errors.unit} />
        {errors.unit && <p className="text-sm text-destructive">{errors.unit}</p>}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="selling_price" className="text-sm font-medium">
          Selling Price
        </label>
        <Input id="selling_price" name="selling_price" type="number" value={formData.selling_price} onChange={handleChange} placeholder="0" min="0" step="0.01" disabled={isLoading} aria-invalid={!!errors.selling_price} />
        {errors.selling_price && <p className="text-sm text-destructive">{errors.selling_price}</p>}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="minimum_stock" className="text-sm font-medium">
          Minimum Stock
        </label>
        <Input id="minimum_stock" name="minimum_stock" type="number" value={formData.minimum_stock} onChange={handleChange} placeholder="0" min="0" step="1" disabled={isLoading} aria-invalid={!!errors.minimum_stock} />
        {errors.minimum_stock && <p className="text-sm text-destructive">{errors.minimum_stock}</p>}
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
}
