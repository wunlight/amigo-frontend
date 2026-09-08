import * as api from "../api/products.api";
import type { CreateProductRequest, Product } from "../types/products.type";

export async function getProducts(): Promise<Product[]> {
  const { data } = await api.list();
  return data;
}

export async function getProduct(id: string): Promise<Product> {
  const { data } = await api.detail(id);
  return data;
}

export async function createProduct(req: CreateProductRequest) {
  await api.create(req);
}
