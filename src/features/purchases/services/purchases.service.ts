import * as api from "../api/purchases.api";
import type { CreatePurchaseRequest } from "../types/purchases.type";

export async function createPurchase(req: CreatePurchaseRequest) {
  const { data } = await api.create(req);
  return data;
}
