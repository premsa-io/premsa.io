import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/AuthContext";

export interface Topic {
  id: string;
  title: string;
  primary_ambit: string | null;
  current_signal_score: number | null;
  event_count: number | null;
  status: string | null;
  created_at: string;
}

export const useTopics = (limit?: number) => {
  const { user } = useAuth();
  const [topics, setTopics] = useState<Topic[]>([]);
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
        .select("id, title, primary_ambit, current_signal_score, event_count, status, created_at")
        .eq("status", "active")
        .order("current_signal_score", { ascending: false })
        .limit(limit || 50);

      if (!error && data) {
        setTopics(data as Topic[]);
      }
      setIsLoading(false);
    };

    fetchTopics();
  }, [user, limit]);

  return { topics, isLoading };
};
