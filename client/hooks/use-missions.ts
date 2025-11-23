import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchMissions, syncMissions } from "@/lib/api";
import type { Mission } from "@/data/missions";

export function useMissions() {
  return useQuery<Mission[], Error>({
    queryKey: ["missions"],
    queryFn: fetchMissions,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

export function useSyncMissions() {
  return useMutation({
    mutationFn: syncMissions,
  });
}
