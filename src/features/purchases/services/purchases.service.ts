import * as api from "../api/purchases.api";
import type { CreatePurchaseRequest } from "../types/purchases.type";

export async function createPurchase(
  items: Array<{ product_id: string; quantity: number; unit_cost: number }>,
  purchasedAt: string = new Date().toISOString()
): Promise<void> {
  const referenceNumber = generateReferenceNumber();
  const req: CreatePurchaseRequest = {
    reference_number: referenceNumber,
    purchased_at: purchasedAt,
    items,
  };
  await api.create(req);
}

function generateReferenceNumber(): string {
  const now = new Date();
  const datetime = now.toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const randomId = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `PUR-${datetime}-${randomId}`;
}