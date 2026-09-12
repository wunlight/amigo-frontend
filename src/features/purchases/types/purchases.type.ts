type PurchaseItem = {
  product_id: string;
  quantity: number;
  unit_cost: number;
};

export type CreatePurchaseRequest = {
  reference_number: string;
  purchased_at: string; // ISO 8601 datetime string (z.iso.datetime)
  items: PurchaseItem[];
};
