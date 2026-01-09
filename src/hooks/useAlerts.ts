import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/AuthContext";

export interface Alert {
  id: string;
  title: string;
  type: string | null;
  signal_score: number | null;
  status: string | null;
  created_at: string;
}

export const useRecentAlerts = (limit = 5) => {
  const { user, account } = useAuth();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("[useRecentAlerts] 🔍 Hook triggered", { user: user?.id, account: account?.id });

    if (!user || !account) {
      console.log("[useRecentAlerts] ⏳ Waiting for user/account...");
      setIsLoading(false);
      return;
    }

    const fetchAlerts = async () => {
      setIsLoading(true);
      console.log("[useRecentAlerts] 📡 Fetching alerts for account:", account.id);

      const { data, error } = await supabase
        .from("alerts" as any)
        .select("id, title, type, signal_score, status, created_at")
        .eq("account_id", account.id)
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
  }, [user, account, limit]);

  return { alerts, isLoading };
};
