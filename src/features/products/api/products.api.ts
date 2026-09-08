import httpClient from "@/utils/http-client";
import type { CreateProductRequest, Product } from "../types/products.type";

const PREFIX = "products";

export async function list() {
  return httpClient.get<Product[]>(PREFIX);
}

export async function detail(id: string) {
  return httpClient.get<Product>(`${PREFIX}/${id}`);
}

export async function create(req: CreateProductRequest) {
  return httpClient.post(PREFIX, req);
}
