import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/AuthContext";

interface StatsData {
  alertsCount: number;
  openedCount: number;
  reportsCount: number;
}

export const useStats = () => {
  const { user, account } = useAuth();
  const [data, setData] = useState<StatsData>({
    alertsCount: 0,
    openedCount: 0,
    reportsCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user || !account) {
      setIsLoading(false);
      return;
    }

    const fetchStats = async () => {
      setIsLoading(true);
      
      // Get alerts count from last 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const [alertsResult, pendingResult, reportsResult] = await Promise.all([
        supabase
          .from("alerts" as any)
          .select("id", { count: "exact", head: true })
          .eq("account_id", account.id)
          .gte("created_at", thirtyDaysAgo.toISOString()),
        supabase
          .from("alerts" as any)
          .select("id", { count: "exact", head: true })
          .eq("account_id", account.id)
          .eq("status", "pending"),
        supabase
          .from("reports" as any)
          .select("id", { count: "exact", head: true })
          .eq("account_id", account.id),
      ]);

      setData({
        alertsCount: alertsResult.count ?? 0,
        openedCount: pendingResult.count ?? 0,
        reportsCount: reportsResult.count ?? 0,
      });
      setIsLoading(false);
    };

    fetchStats();
  }, [user, account]);

  return { ...data, isLoading };
};

export interface Alert {
  id: string;
  title: string;
  topic_id: string | null;
  signal_score: number | null;
  status: string | null;
  date: string;
}

export const useRecentAlerts = () => {
  const { user, account } = useAuth();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user || !account) {
      setIsLoading(false);
      return;
    }

    const fetchAlerts = async () => {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from("alerts" as any)
        .select("id, title, topic_id, signal_score, status, created_at")
        .eq("account_id", account.id)
        .order("created_at", { ascending: false })
        .limit(5);

      if (!error && data) {
        setAlerts(
          (data as any[]).map((alert) => ({
            id: alert.id,
            title: alert.title,
            topic_id: alert.topic_id,
            signal_score: alert.signal_score,
            status: alert.status,
            date: new Date(alert.created_at).toLocaleDateString("ca-ES"),
          }))
        );
      }
      setIsLoading(false);
    };

    fetchAlerts();
  }, [user, account]);

  return { alerts, isLoading };
};

export interface TrendingTopic {
  id: string;
  title: string;
  primary_ambit: string | null;
  current_signal_score: number | null;
  event_count: number | null;
}

export const useTrendingTopics = () => {
  const { user } = useAuth();
  const [topics, setTopics] = useState<TrendingTopic[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    const fetchTopics = async () => {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from("topics" as any)
        .select("id, title, primary_ambit, current_signal_score, event_count")
        .order("current_signal_score", { ascending: false })
        .limit(5);

      if (!error && data) {
        setTopics(
          (data as any[]).map((t) => ({
            id: t.id,
            title: t.title,
            primary_ambit: t.primary_ambit,
            current_signal_score: t.current_signal_score,
            event_count: t.event_count,
          }))
        );
      }
      setIsLoading(false);
    };

    fetchTopics();
  }, [user]);

  return { topics, isLoading };
};
