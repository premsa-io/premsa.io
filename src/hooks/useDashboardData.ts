import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/AuthContext";

interface StatsData {
  alertsCount: number;
  openedCount: number;
  reportsCount: number;
}

export const useStats = () => {
  const { user } = useAuth();
  const [data, setData] = useState<StatsData>({
    alertsCount: 0,
    openedCount: 0,
    reportsCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    const fetchStats = async () => {
      setIsLoading(true);
      
      // Get alerts count from last 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const [alertsResult, openedResult, reportsResult] = await Promise.all([
        supabase
          .from("alerts")
          .select("id", { count: "exact", head: true })
          .eq("user_id", user.id)
          .gte("created_at", thirtyDaysAgo.toISOString()),
        supabase
          .from("alerts")
          .select("id", { count: "exact", head: true })
          .eq("user_id", user.id)
          .eq("is_read", false),
        supabase
          .from("reports")
          .select("id", { count: "exact", head: true })
          .eq("user_id", user.id),
      ]);

      setData({
        alertsCount: alertsResult.count ?? 0,
        openedCount: openedResult.count ?? 0,
        reportsCount: reportsResult.count ?? 0,
      });
      setIsLoading(false);
    };

    fetchStats();
  }, [user]);

  return { ...data, isLoading };
};

export interface Alert {
  id: string;
  title: string;
  source: string | null;
  date: string;
}

export const useRecentAlerts = () => {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    const fetchAlerts = async () => {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from("alerts")
        .select("id, title, source, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5);

      if (!error && data) {
        setAlerts(
          data.map((alert) => ({
            id: alert.id,
            title: alert.title,
            source: alert.source,
            date: new Date(alert.created_at).toLocaleDateString("ca-ES"),
          }))
        );
      }
      setIsLoading(false);
    };

    fetchAlerts();
  }, [user]);

  return { alerts, isLoading };
};

export interface TrendingTopic {
  id: string;
  topic: string;
  mentions: number;
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
        .from("topics")
        .select("id, topic, mentions")
        .eq("user_id", user.id)
        .order("mentions", { ascending: false })
        .limit(5);

      if (!error && data) {
        setTopics(
          data.map((t) => ({
            id: t.id,
            topic: t.topic,
            mentions: t.mentions ?? 0,
          }))
        );
      }
      setIsLoading(false);
    };

    fetchTopics();
  }, [user]);

  return { topics, isLoading };
};
