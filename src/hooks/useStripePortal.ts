import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";

const STRIPE_ENDPOINT = "https://evdrqasjbwputqqejqqe.supabase.co/functions/v1/stripe-checkout";

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
      const response = await fetch(STRIPE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create-portal-session",
          account_id: account.id,
          return_url: returnUrl || `${window.location.origin}/dashboard/settings`,
        }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Error opening customer portal";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { openPortal, isLoading, error };
};
