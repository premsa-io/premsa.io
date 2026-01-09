import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/AuthContext";

export interface Interpretation {
  id: string;
  account_id: string;
  title: string | null;
  summary: string | null;
  impact_level: string | null;
  recommended_actions: string[] | null;
  status: string | null;
  created_at: string;
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
        .select("id, account_id, title, summary, impact_level, recommended_actions, status, created_at")
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
