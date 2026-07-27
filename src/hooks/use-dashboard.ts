import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/auth-context";
import { fetchDashboardSummary } from "@/services/dashboard-service";

export function useDashboard() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["dashboard", user?.id],
    queryFn: () => fetchDashboardSummary(user!.id),
    enabled: !!user?.id,
  });
}
