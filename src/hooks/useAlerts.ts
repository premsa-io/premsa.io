import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/AuthContext";

export interface Alert {
  id: string;
  title: string;
  alert_type: string | null;
  signal_score: number | null;
  status: string | null;
  created_at: string;
}

export const useRecentAlerts = (limit = 5) => {
  const { user, profile } = useAuth();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("[useRecentAlerts] 🔍 Hook triggered", { user: user?.id, account_id: profile?.account_id });

    if (!user || !profile?.account_id) {
      console.log("[useRecentAlerts] ⏳ Waiting for profile.account_id...");
      setIsLoading(false);
      return;
    }

    const accountId = profile.account_id;

    const fetchAlerts = async () => {
      setIsLoading(true);
      console.log("[useRecentAlerts] 📡 Fetching alerts for account:", accountId);

      const { data, error } = await supabase
        .from("alerts" as any)
        .select("id, title, alert_type, signal_score, status, created_at")
        .eq("account_id", accountId)
        .order("created_at", { ascending: false })
        .limit(limit);

      console.log("[useRecentAlerts] 📊 Query result:", {
        count: data?.length ?? 0,
        error: error?.message,
        sample: data?.[0],
      });

      if (!error && data) {
        setAlerts(data as Alert[]);
      }
      setIsLoading(false);
    };

    fetchAlerts();
  }, [user, profile?.account_id, limit]);

  return { alerts, isLoading };
};
