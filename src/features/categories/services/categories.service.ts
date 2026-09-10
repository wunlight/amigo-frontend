import * as api from "../api/categories.api";
import type { Category } from "../types/categories.type";

export async function getCategories(): Promise<Category[]> {
  const { data } = await api.list();
  return data;
}

export async function getCategory(id: string): Promise<Category> {
  const { data } = await api.detail(id);
  return data;
}

export async function createCategory(name: string) {
  await api.create({ name });
}

export async function updateCategory(id: string, name: string) {
  await api.update(id, { name });
}

export async function deleteCategory(id: string) {
  await api.remove(id);
}
