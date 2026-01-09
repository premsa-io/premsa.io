import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/AuthContext";

export interface KnowledgeDocument {
  id: string;
  account_id: string;
  title: string | null;
  content_type: string | null;
  keywords: string[] | null;
  inferred_domains: string[] | null;
  status: string | null;
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
        .select("id, account_id, title, content_type, keywords, inferred_domains, status, created_at")
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
