import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Category } from "@/features/categories/types/categories.type";
import type { CreateProductRequest } from "../types/products.type";

type ProductFormProps = {
  initialValue?: Partial<CreateProductRequest>;
  categories: Category[];
  onSubmit: (data: CreateProductRequest) => void;
  onCancel: () => void;
  isLoading?: boolean;
};

export default function ProductForm({ initialValue, categories, onSubmit, onCancel, isLoading = false }: ProductFormProps) {
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

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type } = e.target;
    const newValue = type === "number" ? Number(value) : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    if (errors[name as keyof CreateProductRequest]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function handleCategoryChange(value: string) {
    setFormData((prev) => ({ ...prev, category_id: value }));
    if (errors.category_id) setErrors((prev) => ({ ...prev, category_id: undefined }));
  }

  function validate(): boolean {
    const ne: Partial<Record<keyof CreateProductRequest, string>> = {};
    if (!formData.category_id) ne.category_id = "Category is required";
    if (!formData.name.trim()) ne.name = "Name is required";
    if (!formData.sku.trim()) ne.sku = "SKU is required";
    if (!formData.unit.trim()) ne.unit = "Unit is required";
    if (formData.selling_price <= 0) ne.selling_price = "Selling price must be greater than 0";
    if (formData.minimum_stock < 0) ne.minimum_stock = "Minimum stock cannot be negative";
    setErrors(ne);
    return Object.keys(ne).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <Field data-invalid={!!errors.category_id}>
          <FieldLabel htmlFor="product-category">Category</FieldLabel>
          <Select value={formData.category_id} onValueChange={handleCategoryChange} disabled={isLoading}>
            <SelectTrigger id="product-category" aria-invalid={!!errors.category_id} className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category_id && <FieldError>{errors.category_id}</FieldError>}
        </Field>

        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="product-name">Name</FieldLabel>
          <Input id="product-name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Product name" disabled={isLoading} aria-invalid={!!errors.name} />
          {errors.name && <FieldError>{errors.name}</FieldError>}
        </Field>

        <Field data-invalid={!!errors.sku}>
          <FieldLabel htmlFor="product-sku">SKU</FieldLabel>
          <Input id="product-sku" name="sku" value={formData.sku} onChange={handleInputChange} placeholder="SKU code" disabled={isLoading} aria-invalid={!!errors.sku} />
          {errors.sku && <FieldError>{errors.sku}</FieldError>}
        </Field>

        <Field data-invalid={!!errors.unit}>
          <FieldLabel htmlFor="product-unit">Unit</FieldLabel>
          <Input id="product-unit" name="unit" value={formData.unit} onChange={handleInputChange} placeholder="e.g., pcs, box, kg" disabled={isLoading} aria-invalid={!!errors.unit} />
          {errors.unit && <FieldError>{errors.unit}</FieldError>}
        </Field>

        <Field data-invalid={!!errors.selling_price}>
          <FieldLabel htmlFor="product-selling-price">Selling Price</FieldLabel>
          <Input id="product-selling-price" name="selling_price" type="number" value={formData.selling_price} onChange={handleInputChange} placeholder="0" min="0" step="0.01" disabled={isLoading} aria-invalid={!!errors.selling_price} />
          {errors.selling_price && <FieldError>{errors.selling_price}</FieldError>}
        </Field>

        <Field data-invalid={!!errors.minimum_stock}>
          <FieldLabel htmlFor="product-minimum-stock">Minimum Stock</FieldLabel>
          <Input id="product-minimum-stock" name="minimum_stock" type="number" value={formData.minimum_stock} onChange={handleInputChange} placeholder="0" min="0" step="1" disabled={isLoading} aria-invalid={!!errors.minimum_stock} />
          {errors.minimum_stock && <FieldError>{errors.minimum_stock}</FieldError>}
        </Field>

        <Field orientation="horizontal" className="justify-end pt-2">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
