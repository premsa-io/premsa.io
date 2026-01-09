import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/AuthContext";

export interface DomainData {
  domain: string;
  count: number;
}

export const useDomainBreakdown = () => {
  const { user, account } = useAuth();
  const [domains, setDomains] = useState<DomainData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("[useDomainBreakdown] 🔍 Hook triggered", { user: user?.id, account: account?.id });

    if (!user || !account) {
      console.log("[useDomainBreakdown] ⏳ Waiting for user/account...");
      setIsLoading(false);
      return;
    }

    const fetchDomains = async () => {
      setIsLoading(true);
      console.log("[useDomainBreakdown] 📡 Fetching domain breakdown for account:", account.id);

      // Get all matches with their topic's primary_ambit
      const { data, error } = await supabase
        .from("client_matches" as any)
        .select("topics(primary_ambit)")
        .eq("account_id", account.id);

      console.log("[useDomainBreakdown] 📊 Query result:", {
        count: data?.length ?? 0,
        error: error?.message,
      });

      if (!error && data) {
        // Count by domain
        const domainCounts: Record<string, number> = {};
        (data as any[]).forEach((match) => {
          const domain = match.topics?.primary_ambit || "Sense àmbit";
          domainCounts[domain] = (domainCounts[domain] || 0) + 1;
        });

        const domainArray = Object.entries(domainCounts)
          .map(([domain, count]) => ({ domain, count }))
          .sort((a, b) => b.count - a.count);

        console.log("[useDomainBreakdown] 📊 Domain breakdown:", domainArray);
        setDomains(domainArray);
      }
      setIsLoading(false);
    };

    fetchDomains();
  }, [user, account]);

  return { domains, isLoading };
};
