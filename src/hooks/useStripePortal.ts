import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";

export const useStripePortal = () => {
  const { account } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openPortal = async (returnUrl?: string) => {
    if (!account) {
      setError("No account found");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("stripe-checkout", {
        body: {
          action: "create-portal-session",
          account_id: account.id,
          return_url: returnUrl || `${window.location.origin}/dashboard/settings`,
        },
      });

      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Error opening customer portal";
      console.error("Portal error:", errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { openPortal, isLoading, error };
};
