import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/AuthContext";

export interface Match {
  id: string;
  topic_id: string | null;
  normalized_item_id: string | null;
  relevance_score: number | null;
  relevance_level: string | null;
  created_at: string;
  topic?: {
    title: string;
    primary_ambit: string | null;
  };
  normalized_item?: {
    neutral_summary_original: string | null;
    document_type: string | null;
    jurisdiction: string | null;
    source_url: string | null;
  };
}

interface UseMatchesOptions {
  limit?: number;
  relevanceLevel?: 'high' | 'medium' | 'low' | null;
  ambit?: string | null;
}

export const useMatches = (options: UseMatchesOptions = {}) => {
  const { limit, relevanceLevel, ambit } = options;
  const { user, profile } = useAuth();
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("[useMatches] 🔍 Hook triggered", { user: user?.id, account_id: profile?.account_id, options });

    if (!user || !profile?.account_id) {
      console.log("[useMatches] ⏳ Waiting for profile.account_id...");
      // Keep isLoading true while waiting for account_id so UI shows loading state
      setIsLoading(true);
      return;
    }

    const accountId = profile.account_id;

    const fetchMatches = async () => {
      setIsLoading(true);
      console.log("[useMatches] 📡 Fetching matches for account:", accountId);

      let query = supabase
        .from("client_matches" as any)
        .select(`
          id, 
          topic_id, 
          normalized_item_id,
          relevance_score, 
          relevance_level, 
          created_at, 
          topics(title, primary_ambit),
          normalized_items(neutral_summary_original, document_type, jurisdiction, source_url)
        `)
        .eq("account_id", accountId)
        .order("created_at", { ascending: false });

      if (relevanceLevel) {
        query = query.eq("relevance_level", relevanceLevel);
      }

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      console.log("[useMatches] 📊 Query result:", {
        count: data?.length ?? 0,
        error: error?.message,
        sample: data?.[0],
      });

      if (!error && data) {
        let processedMatches = (data as any[]).map((m) => ({
          id: m.id,
          topic_id: m.topic_id,
          normalized_item_id: m.normalized_item_id,
          relevance_score: m.relevance_score,
          relevance_level: m.relevance_level,
          created_at: m.created_at,
          topic: m.topics,
          normalized_item: m.normalized_items,
        }));

        // Filter by ambit if specified
        if (ambit) {
          processedMatches = processedMatches.filter(
            (m) => m.topic?.primary_ambit?.toLowerCase() === ambit.toLowerCase()
          );
        }

        setMatches(processedMatches);
      }
      setIsLoading(false);
    };

    fetchMatches();
  }, [user, profile?.account_id, limit, relevanceLevel, ambit]);

  return { matches, isLoading };
};

// Keep the old hook for backwards compatibility
export const useRecentMatches = (limit = 5) => {
  return useMatches({ limit });
};
