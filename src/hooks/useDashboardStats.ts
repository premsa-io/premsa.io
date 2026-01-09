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
  const { user, account } = useAuth();
  const [data, setData] = useState<StatsData>({
    alertsCount: 0,
    matchesCount: 0,
    reportsCount: 0,
    topicsCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("[useDashboardStats] 🔍 Hook triggered", { user: user?.id, account: account?.id });

    if (!user || !account) {
      console.log("[useDashboardStats] ⏳ Waiting for user/account...", { user: !!user, account: !!account });
      setIsLoading(false);
      return;
    }

    const fetchStats = async () => {
      setIsLoading(true);
      console.log("[useDashboardStats] 📡 Fetching stats for account:", account.id);

      try {
        const [alertsResult, matchesResult, reportsResult, topicsResult] = await Promise.all([
          supabase
            .from("alerts" as any)
            .select("id", { count: "exact", head: true })
            .eq("account_id", account.id),
          supabase
            .from("client_matches" as any)
            .select("id", { count: "exact", head: true })
            .eq("account_id", account.id),
          supabase
            .from("reports" as any)
            .select("id", { count: "exact", head: true })
            .eq("account_id", account.id),
          supabase
            .from("topics" as any)
            .select("id", { count: "exact", head: true }),
        ]);

        console.log("[useDashboardStats] 📊 Query results:", {
          alerts: { count: alertsResult.count, error: alertsResult.error?.message },
          matches: { count: matchesResult.count, error: matchesResult.error?.message },
          reports: { count: reportsResult.count, error: reportsResult.error?.message },
          topics: { count: topicsResult.count, error: topicsResult.error?.message },
        });

        setData({
          alertsCount: alertsResult.count ?? 0,
          matchesCount: matchesResult.count ?? 0,
          reportsCount: reportsResult.count ?? 0,
          topicsCount: topicsResult.count ?? 0,
        });
      } catch (e) {
        console.error("[useDashboardStats] 💥 Error:", e);
      }

      setIsLoading(false);
    };

    fetchStats();
  }, [user, account]);

  return { ...data, isLoading };
};
