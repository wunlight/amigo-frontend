import { useQuery } from "@tanstack/react-query";
import * as service from "../services/products.service";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: service.getProducts,
  });
}
