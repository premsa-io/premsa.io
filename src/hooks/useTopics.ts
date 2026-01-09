import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/AuthContext";

export interface Topic {
  id: string;
  title: string;
  description: string | null;
  primary_ambit: string | null;
  status: string | null;
  created_at: string;
}

export const useTopics = (limit?: number) => {
  const { user, profile } = useAuth();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("[useTopics] 🔍 Hook triggered", { user: user?.id, account_id: profile?.account_id });

    if (!user || !profile?.account_id) {
      console.log("[useTopics] ⏳ Waiting for profile.account_id...");
      setIsLoading(false);
      return;
    }

    const accountId = profile.account_id;

    const fetchTopics = async () => {
      setIsLoading(true);
      console.log("[useTopics] 📡 Fetching topics for account:", accountId);

      let query = supabase
        .from("topics" as any)
        .select("id, title, description, primary_ambit, status, created_at")
        .eq("account_id", accountId)
        .order("created_at", { ascending: false });

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      console.log("[useTopics] 📊 Query result:", {
        count: data?.length ?? 0,
        error: error?.message,
        sample: data?.[0],
      });

      if (!error && data) {
        setTopics(data as Topic[]);
      }
      setIsLoading(false);
    };

    fetchTopics();
  }, [user, profile?.account_id, limit]);

  return { topics, isLoading };
};
