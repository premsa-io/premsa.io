import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/AuthContext";

export const useUnreadAlertsCount = () => {
  const { user, profile } = useAuth();
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user || !profile?.account_id) {
      setIsLoading(false);
      return;
    }

    const accountId = profile.account_id;

    const fetchCount = async () => {
      setIsLoading(true);

      const { count: alertCount, error } = await supabase
        .from("alerts" as any)
        .select("*", { count: "exact", head: true })
        .eq("account_id", accountId)
        .eq("status", "new");

      if (!error && alertCount !== null) {
        setCount(alertCount);
      }
      setIsLoading(false);
    };

    fetchCount();
  }, [user, profile?.account_id]);

  return { count, isLoading };
};
