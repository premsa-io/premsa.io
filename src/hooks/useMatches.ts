import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/AuthContext";

export interface Match {
  id: string;
  topic_id: string | null;
  relevance_score: number | null;
  relevance_level: string | null;
  created_at: string;
  topic?: {
    title: string;
    primary_ambit: string | null;
  };
}

export const useRecentMatches = (limit = 5) => {
  const { user, profile } = useAuth();
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("[useRecentMatches] 🔍 Hook triggered", { user: user?.id, account_id: profile?.account_id });

    if (!user || !profile?.account_id) {
      console.log("[useRecentMatches] ⏳ Waiting for profile.account_id...");
      setIsLoading(false);
      return;
    }

    const accountId = profile.account_id;

    const fetchMatches = async () => {
      setIsLoading(true);
      console.log("[useRecentMatches] 📡 Fetching matches for account:", accountId);

      const { data, error } = await supabase
        .from("client_matches" as any)
        .select("id, topic_id, relevance_score, relevance_level, created_at, topics(title, primary_ambit)")
        .eq("account_id", accountId)
        .order("created_at", { ascending: false })
        .limit(limit);

      console.log("[useRecentMatches] 📊 Query result:", {
        count: data?.length ?? 0,
        error: error?.message,
        sample: data?.[0],
      });

      if (!error && data) {
        setMatches(
          (data as any[]).map((m) => ({
            id: m.id,
            topic_id: m.topic_id,
            relevance_score: m.relevance_score,
            relevance_level: m.relevance_level,
            created_at: m.created_at,
            topic: m.topics,
          }))
        );
      }
      setIsLoading(false);
    };

    fetchMatches();
  }, [user, profile?.account_id, limit]);

  return { matches, isLoading };
};
