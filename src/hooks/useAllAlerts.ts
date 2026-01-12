import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/AuthContext";

export interface Alert {
  id: string;
  title: string;
  summary: string | null;
  alert_type: string | null;
  signal_score: number | null;
  status: string | null;
  created_at: string;
}

export const useAllAlerts = (limit?: number) => {
  const { user, profile } = useAuth();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user || !profile?.account_id) {
      setIsLoading(false);
      return;
    }

    const accountId = profile.account_id;

    const fetchAlerts = async () => {
      setIsLoading(true);

      let query = supabase
        .from("alerts" as any)
        .select("id, title, summary, alert_type, signal_score, status, created_at")
        .eq("account_id", accountId)
        .order("created_at", { ascending: false });

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (!error && data) {
        setAlerts(data as Alert[]);
      }
      setIsLoading(false);
    };

    fetchAlerts();
  }, [user, profile?.account_id, limit]);

  return { alerts, isLoading };
};
