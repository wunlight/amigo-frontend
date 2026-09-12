import httpClient from "@/utils/http-client";
import type { CreateSaleRequest } from "../types/sales.type";

export async function create(req: CreateSaleRequest) {
  return httpClient.post("sales", req);
}
