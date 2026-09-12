import * as api from "../api/sales.api";
import type {
  CreateSaleRequest,
  SaleProductItem,
  SaleServiceItem,
} from "../types/sales.type";

export async function createSale(
  productItems: SaleProductItem[],
  serviceItems: SaleServiceItem[] = [],
  soldAt: string = new Date().toISOString(),
): Promise<void> {
  const referenceNumber = generateReferenceNumber();
  const req: CreateSaleRequest = {
    reference_number: referenceNumber,
    discount: 0.0,
    sold_at: soldAt,
    product_items: productItems,
    service_items: serviceItems,
    notes: "",
  };
  await api.create(req);
}

function generateReferenceNumber(): string {
  const now = new Date();
  const datetime = now.toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const randomId = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `SAL-${datetime}-${randomId}`;
}
