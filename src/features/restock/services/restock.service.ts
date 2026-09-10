import * as api from "../api/restock.api";
import type { CreateRestockRequest } from "../types/restock.type";

export async function createRestock(req: CreateRestockRequest) {
  const { data } = await api.create(req);
  return data;
}
