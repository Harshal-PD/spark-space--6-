import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchPlanets, syncPlanets } from "@/lib/api";
import type { Planet } from "@/data/planets";

export function usePlanets() {
  return useQuery<Planet[], Error>({
    queryKey: ["planets"],
    queryFn: fetchPlanets,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

export function useSyncPlanets() {
  return useMutation({
    mutationFn: syncPlanets,
  });
}
