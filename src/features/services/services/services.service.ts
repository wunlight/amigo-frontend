import * as api from "../api/services.api";
import type { Service } from "../types/services.type";

export async function getServices(): Promise<Service[]> {
  const { data } = await api.list();
  return data;
}

export async function getService(id: string): Promise<Service> {
  const { data } = await api.detail(id);
  return data;
}

export async function createService(name: string, default_price: number) {
  await api.create({ name, default_price });
}

export async function updateService(id: string, name: string, default_price: number) {
  await api.update(id, { name, default_price });
}

export async function deleteService(id: string) {
  await api.remove(id);
}