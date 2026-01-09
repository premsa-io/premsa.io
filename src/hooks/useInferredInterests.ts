import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/AuthContext";

export interface InferredAmbit {
  ambit: string;
  matchCount: number;
  topTopics: { title: string; count: number }[];
}

export const useInferredInterests = () => {
  const { profile } = useAuth();
  const [ambits, setAmbits] = useState<InferredAmbit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!profile?.account_id) {
      setIsLoading(false);
      return;
    }

    const fetchInterests = async () => {
      setIsLoading(true);

      const { data, error } = await supabase
        .from("client_matches" as any)
        .select("id, topics(title, primary_ambit)")
        .eq("account_id", profile.account_id);

      if (!error && data) {
        const ambitMap = new Map<string, { count: number; topics: Map<string, number> }>();

        (data as any[]).forEach((match) => {
          const ambit = match.topics?.primary_ambit;
          const topicTitle = match.topics?.title;

          if (ambit) {
            if (!ambitMap.has(ambit)) {
              ambitMap.set(ambit, { count: 0, topics: new Map() });
            }
            const entry = ambitMap.get(ambit)!;
            entry.count++;

            if (topicTitle) {
              entry.topics.set(topicTitle, (entry.topics.get(topicTitle) || 0) + 1);
            }
          }
        });

        const result: InferredAmbit[] = Array.from(ambitMap.entries())
          .map(([ambit, data]) => ({
            ambit,
            matchCount: data.count,
            topTopics: Array.from(data.topics.entries())
              .sort((a, b) => b[1] - a[1])
              .slice(0, 3)
              .map(([title, count]) => ({ title, count })),
          }))
          .sort((a, b) => b.matchCount - a.matchCount);

        setAmbits(result);
      }
      setIsLoading(false);
    };

    fetchInterests();
  }, [profile?.account_id]);

  return { ambits, isLoading };
};
