import httpClient from "@/utils/http-client";
import type { CreateServiceRequest, Service } from "../types/services.type";

const PREFIX = "services";

export async function list() {
  return httpClient.get<Service[]>(PREFIX);
}

export async function detail(id: string) {
  return httpClient.get<Service>(`${PREFIX}/${id}`);
}

export async function create(req: CreateServiceRequest) {
  return httpClient.post(PREFIX, req);
}

export async function update(id: string, req: CreateServiceRequest) {
  return httpClient.put(`${PREFIX}/${id}`, req);
}

export async function remove(id: string) {
  return httpClient.delete(`${PREFIX}/${id}`);
}