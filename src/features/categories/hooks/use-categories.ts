import { useQuery } from "@tanstack/react-query";
import * as service from "../services/categories.service";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: service.getCategories,
  });
}
