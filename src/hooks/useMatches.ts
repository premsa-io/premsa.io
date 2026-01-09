import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/AuthContext";

export interface Match {
  id: string;
  topic_id: string | null;
  relevance_score: number | null;
  matched_at: string;
  topic?: {
    title: string;
    primary_ambit: string | null;
  };
}

export const useRecentMatches = (limit = 5) => {
  const { user, account } = useAuth();
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("[useRecentMatches] 🔍 Hook triggered", { user: user?.id, account: account?.id });

    if (!user || !account) {
      console.log("[useRecentMatches] ⏳ Waiting for user/account...");
      setIsLoading(false);
      return;
    }

    const fetchMatches = async () => {
      setIsLoading(true);
      console.log("[useRecentMatches] 📡 Fetching matches for account:", account.id);

      const { data, error } = await supabase
        .from("client_matches" as any)
        .select("id, topic_id, relevance_score, matched_at, topics(title, primary_ambit)")
        .eq("account_id", account.id)
        .order("matched_at", { ascending: false })
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
            matched_at: m.matched_at,
            topic: m.topics,
          }))
        );
      }
      setIsLoading(false);
    };

    fetchMatches();
  }, [user, account, limit]);

  return { matches, isLoading };
};
