import { useQuery } from "@tanstack/react-query";
import * as service from "../services/services.service";

export function useServices() {
  return useQuery({
    queryKey: ["services"],
    queryFn: service.getServices,
  });
}