import { useCategories } from "@/features/categories/hooks/use-categories";
import { useState } from "react";
import * as service from "../services/products.service";
import type { CreateProductRequest } from "../types/products.type";

function ProductForm() {
  const [showForm, setShowForm] = useState<boolean>(false);

  const [formValue, setFormValue] = useState<CreateProductRequest>({
    category_id: "",
    name: "",
    sku: "",
    unit: "",
    selling_price: 0,
    minimum_stock: 0,
  });

  const { data: categories = [], isFetching } = useCategories();

  function onFieldChange<K extends keyof CreateProductRequest>(
    key: K,
    value: CreateProductRequest[K],
  ) {
    setFormValue((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function onFormSubmit() {
    try {
      await service.createProduct(formValue);
      setShowForm(false);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <button
        onClick={() => setShowForm(true)}
        className="ml-auto flex items-center gap-3 px-3 h-9 text-zinc-50 bg-indigo-500 hover:bg-indigo-600 rounded-full shadow-md"
      >
        <span className="icon-[mdi--add]" />
        <span>Add Product</span>
      </button>

      {showForm && (
        <div className="fixed inset-0 grid place-content-center bg-zinc-950/30">
          <div className="flex flex-col gap-4 p-4 bg-zinc-50 rounded-lg">
            <input
              type="text"
              placeholder="Product name"
              value={formValue.name}
              onChange={(e) => onFieldChange("name", e.target.value)}
              className="px-3 h-10 border border-zinc-400 rounded"
            />
            <input
              type="text"
              placeholder="SKU"
              value={formValue.sku}
              onChange={(e) => onFieldChange("sku", e.target.value)}
              className="px-3 h-10 border border-zinc-400 rounded"
            />
            <select
              value={formValue.category_id}
              disabled={isFetching}
              onChange={(e) => onFieldChange("category_id", e.target.value)}
              className="px-3 h-10 border border-zinc-400 rounded"
            >
              <option value="" disabled>
                Select category
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Unit"
              value={formValue.unit}
              onChange={(e) => onFieldChange("unit", e.target.value)}
              className="px-3 h-10 border border-zinc-400 rounded"
            />
            <input
              type="number"
              placeholder="Selling price"
              value={formValue.selling_price}
              onChange={(e) =>
                onFieldChange("selling_price", Number(e.target.value))
              }
              className="px-3 h-10 border border-zinc-400 rounded"
            />
            <input
              type="number"
              placeholder="Minimum stock"
              value={formValue.minimum_stock}
              onChange={(e) =>
                onFieldChange("minimum_stock", Number(e.target.value))
              }
              className="px-3 h-10 border border-zinc-400 rounded"
            />

            <hr className="border-zinc-300" />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="flex items-center gap-3 px-3 h-9 text-zinc-600 bg-zinc-100 hover:bg-zinc-200 rounded-full shadow-md"
              >
                <span>Cancel</span>
              </button>
              <button
                onClick={() => onFormSubmit()}
                className="flex items-center gap-3 px-3 h-9 text-zinc-50 bg-indigo-500 hover:bg-indigo-600 rounded-full shadow-md"
              >
                <span>Submit</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductForm;
