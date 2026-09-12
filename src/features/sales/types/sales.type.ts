export type SaleProductItem = {
  product_id: string;
  quantity: number;
  unit_price: number;
  unit_cost: number;
};

export type SaleServiceItem = {
  service_id: string;
  unit_price: number;
};

export type CreateSaleRequest = {
  reference_number: string;
  discount: number;
  sold_at: string;
  product_items: SaleProductItem[];
  service_items: SaleServiceItem[];
  notes: string;
};
