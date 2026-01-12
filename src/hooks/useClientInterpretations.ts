import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/AuthContext";

export interface Interpretation {
  id: string;
  account_id: string;
  topic_id: string | null;
  normalized_item_id: string | null;
  relevance: string | null;
  risk: string | null;
  opportunity: string | null;
  recommended_action: string | null;
  priority: string | null;
  confidence_level: string | null;
  interpretation_scope: string | null;
  created_at: string;
  // Joined data
  topics?: {
    title: string;
    primary_ambit: string | null;
  } | null;
}

export const useClientInterpretations = (limit?: number) => {
  const { profile } = useAuth();
  const [interpretations, setInterpretations] = useState<Interpretation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!profile?.account_id) {
      setIsLoading(false);
      return;
    }

    const fetchInterpretations = async () => {
      setIsLoading(true);
      let query = supabase
        .from("client_interpretations" as any)
        .select(`
          id, 
          account_id, 
          topic_id,
          normalized_item_id,
          relevance, 
          risk,
          opportunity,
          recommended_action, 
          priority, 
          confidence_level,
          interpretation_scope,
          created_at,
          topics(title, primary_ambit)
        `)
        .eq("account_id", profile.account_id)
        .order("created_at", { ascending: false });

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (!error && data) {
        setInterpretations(data as Interpretation[]);
      }
      setIsLoading(false);
    };

    fetchInterpretations();
  }, [profile?.account_id, limit]);

  return { interpretations, isLoading };
};
