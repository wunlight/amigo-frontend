export type CreatePurchaseItemRequest = {
  product_id: string;
  quantity: number;
  unit_cost: number;
};

export type CreatePurchaseRequest = {
  reference_number: string;
  purchased_at: string;
  items: CreatePurchaseItemRequest[];
  notes?: string | undefined;
};
