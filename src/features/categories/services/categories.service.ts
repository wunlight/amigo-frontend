import * as api from "../api/categories.api";
import type { Category, CreateCategoryRequest } from "../types/categories.type";

export async function getCategories(): Promise<Category[]> {
  const { data } = await api.list();
  return data;
}

export async function getCategory(id: string): Promise<Category> {
  const { data } = await api.detail(id);
  return data;
}

export async function createCategory(req: CreateCategoryRequest) {
  await api.create(req);
}
