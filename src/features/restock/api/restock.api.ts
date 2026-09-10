import httpClient from "@/utils/http-client";
import type { CreateRestockRequest } from "../types/restock.type";

export async function create(req: CreateRestockRequest) {
  return httpClient.post("restock", req);
}
