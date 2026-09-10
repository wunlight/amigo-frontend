export type CreateRestockItemRequest = {
  product_id: string;
  quantity: number;
  unit_cost: number;
};

export type CreateRestockRequest = {
  reference_number: string;
  purchased_at: string;
  items: CreateRestockItemRequest[];
  notes?: string | undefined;
};
