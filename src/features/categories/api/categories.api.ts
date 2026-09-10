import httpClient from "@/utils/http-client";
import type { Category, CreateCategoryRequest } from "../types/categories.type";

const PREFIX = "categories";

export async function list() {
  return httpClient.get<Category[]>(PREFIX);
}

export async function detail(id: string) {
  return httpClient.get(`${PREFIX}/${id}`);
}

export async function create(req: CreateCategoryRequest) {
  return httpClient.post(PREFIX, req);
}

export async function update(id: string, req: CreateCategoryRequest) {
  return httpClient.put(`${PREFIX}/${id}`, req);
}

export async function remove(id: string) {
  return httpClient.delete(`${PREFIX}/${id}`);
}
