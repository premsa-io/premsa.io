import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/AuthContext";

export interface Match {
  id: string;
  account_id?: string;
  topic_id: string | null;
  normalized_item_id: string | null;
  relevance_score: number | null;
  relevance_level: string | null;
  created_at: string;
  // Compatibility with nested structure used by MatchCard
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
  offset?: number;
  relevanceLevel?: "high" | "medium" | "low" | null;
  ambit?: string | null;
}

export const useMatches = (options: UseMatchesOptions = {}) => {
  const { user, profile } = useAuth();
  const { limit = 50, offset = 0, relevanceLevel = null, ambit = null } = options;

  const query = useQuery({
    queryKey: ["matches", profile?.account_id, limit, offset, relevanceLevel, ambit],
    queryFn: async (): Promise<Match[]> => {
      console.log("[useMatches] Calling RPC get_my_matches for account:", profile?.account_id);

      const { data, error } = await supabase.rpc("get_my_matches", {
        p_limit: limit,
        p_offset: offset,
        p_relevance_level: relevanceLevel,
        p_ambit: ambit,
      });

      if (error) {
        console.error("[useMatches] RPC Error:", error);
        throw error;
      }

      console.log("[useMatches] RPC Result:", data?.length, "matches");

      // Transform flat RPC response to nested structure for MatchCard compatibility
      return (data || []).map((m: any) => ({
        id: m.id,
        account_id: m.account_id,
        topic_id: m.topic_id,
        normalized_item_id: m.normalized_item_id,
        relevance_score: m.relevance_score,
        relevance_level: m.relevance_level,
        created_at: m.created_at,
        topic: {
          title: m.topic_title || "",
          primary_ambit: m.topic_ambit,
        },
        normalized_item: {
          neutral_summary_original: m.neutral_summary_original,
          document_type: m.document_type,
          jurisdiction: m.jurisdiction,
          source_url: m.source_url,
        },
      }));
    },
    enabled: !!user && !!profile?.account_id,
  });

  return {
    matches: query.data || [],
    isLoading: query.isLoading,
  };
};

// Keep the old hook for backwards compatibility
export const useRecentMatches = (limit = 5) => {
  return useMatches({ limit, offset: 0 });
};
