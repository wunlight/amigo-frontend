export type Product = {
  id: string;
  category_id: string;
  name: string;
  sku: string;
  unit: string;
  selling_price: number;
  minimum_stock: number;
  current_stock: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type CreateProductRequest = {
  category_id: string;
  name: string;
  sku: string;
  unit: string;
  selling_price: number;
  minimum_stock: number;
};
