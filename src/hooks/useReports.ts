import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/AuthContext";

export interface Report {
  id: string;
  title: string;
  executive_summary: string | null;
  full_content: string | null;
  report_type: string | null;
  period_start: string | null;
  period_end: string | null;
  status: string | null;
  pdf_url: string | null;
  topics_covered: string[] | null;
  interpretations_count: number | null;
  created_at: string;
}

export const useReports = (limit?: number) => {
  const { user, profile } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user || !profile?.account_id) {
      setIsLoading(false);
      return;
    }

    const accountId = profile.account_id;

    const fetchReports = async () => {
      setIsLoading(true);

      let query = supabase
        .from("reports" as any)
        .select("id, title, executive_summary, full_content, report_type, period_start, period_end, status, pdf_url, topics_covered, interpretations_count, created_at")
        .eq("account_id", accountId)
        .order("created_at", { ascending: false });

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (!error && data) {
        setReports(data as Report[]);
      }
      setIsLoading(false);
    };

    fetchReports();
  }, [user, profile?.account_id, limit]);

  return { reports, isLoading };
};
