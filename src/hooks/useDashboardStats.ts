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
  const { user, profile, account } = useAuth();
  const [data, setData] = useState<StatsData>({
    alertsCount: 0,
    matchesCount: 0,
    reportsCount: 0,
    topicsCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("[useDashboardStats] 🔍 Hook triggered", { user: user?.id, account: account?.id, profile: profile?.account_id });

    if (!user || !profile?.account_id) {
      console.log("[useDashboardStats] ⏳ Waiting for profile.account_id...", { user: !!user, profile: !!profile, account_id: profile?.account_id });
      setIsLoading(false);
      return;
    }

    const accountId = profile.account_id;

    const fetchStats = async () => {
      setIsLoading(true);
      console.log("[useDashboardStats] 📡 Fetching stats for account:", accountId);

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
  }, [user, profile?.account_id]);

  return { ...data, isLoading };
};
