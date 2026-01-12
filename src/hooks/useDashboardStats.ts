import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/AuthContext";

interface StatsData {
  alertsCount: number;
  matchesCount: number;
  reportsCount: number;
  topicsCount: number;
}

export const useDashboardStats = () => {
  const { user, profile } = useAuth();
  const [data, setData] = useState<StatsData>({
    alertsCount: 0,
    matchesCount: 0,
    reportsCount: 0,
    topicsCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user || !profile?.account_id) {
      setIsLoading(false);
      return;
    }

    const accountId = profile.account_id;

    const fetchStats = async () => {
      setIsLoading(true);

      try {
        const [alertsResult, matchesResult, reportsResult, topicsResult] = await Promise.all([
          supabase
            .from("alerts" as any)
            .select("id", { count: "exact", head: true })
            .eq("account_id", accountId),
          supabase
            .from("client_matches" as any)
            .select("id", { count: "exact", head: true })
            .eq("account_id", accountId),
          supabase
            .from("reports" as any)
            .select("id", { count: "exact", head: true })
            .eq("account_id", accountId),
          supabase
            .from("topics" as any)
            .select("id", { count: "exact", head: true }),
        ]);

        setData({
          alertsCount: alertsResult.count ?? 0,
          matchesCount: matchesResult.count ?? 0,
          reportsCount: reportsResult.count ?? 0,
          topicsCount: topicsResult.count ?? 0,
        });
      } catch {
        // Keep default values on error
      }

      setIsLoading(false);
    };

    fetchStats();
  }, [user, profile?.account_id]);

  return { ...data, isLoading };
};
