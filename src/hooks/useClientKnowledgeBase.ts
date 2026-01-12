import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/AuthContext";

export interface KnowledgeDocument {
  id: string;
  account_id: string;
  content_type: string | null;
  processed_summary: string | null;
  inferred_keywords: string[] | null;
  inferred_domains: string[] | null;
  is_active: boolean | null;
  source_filename: string | null;
  created_at: string;
}

export const useClientKnowledgeBase = () => {
  const { profile } = useAuth();
  const [documents, setDocuments] = useState<KnowledgeDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!profile?.account_id) {
      setIsLoading(false);
      return;
    }

    const fetchDocuments = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("client_knowledge_base" as any)
        .select("id, account_id, content_type, processed_summary, inferred_keywords, inferred_domains, is_active, source_filename, created_at")
        .eq("account_id", profile.account_id)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setDocuments(data as KnowledgeDocument[]);
      }
      setIsLoading(false);
    };

    fetchDocuments();
  }, [profile?.account_id]);

  return { documents, isLoading };
};
