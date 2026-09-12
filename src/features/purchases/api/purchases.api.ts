import httpClient from "@/utils/http-client";
import type { CreatePurchaseRequest } from "../types/purchases.type";

export async function create(req: CreatePurchaseRequest) {
  return httpClient.post("purchases", req);
}
