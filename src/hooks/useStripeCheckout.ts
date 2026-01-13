import { useState, useCallback } from "react";
import { useAuth } from "@/lib/AuthContext";

interface StripePrice {
  id: string;
  lookup_key: string;
  unit_amount: number;
  currency: string;
  product_name: string;
  recurring: { interval: string } | null;
}

const STRIPE_ENDPOINT = "https://evdrqasjbwputqqejqqe.supabase.co/functions/v1/stripe-checkout";

export const useStripeCheckout = () => {
  const { user, account } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prices, setPrices] = useState<StripePrice[]>([]);

  // Fetch all prices from Stripe via Edge Function
  const fetchPrices = useCallback(async () => {
    try {
      const response = await fetch(STRIPE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "get-prices" }),
      });
      const data = await response.json();
      if (data.prices) {
        setPrices(data.prices);
        return data.prices;
      }
      return [];
    } catch (err: unknown) {
      console.error("Error fetching prices:", err);
      return [];
    }
  }, []);

  // Start checkout session with lookup_key
  const startCheckout = async (lookupKey: string) => {
    if (!user || !account) {
      setError("Has d'iniciar sessió per contractar");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // First, fetch prices if we don't have them
      let currentPrices = prices;
      if (currentPrices.length === 0) {
        currentPrices = await fetchPrices();
      }

      // Find the price by lookup_key
      const price = currentPrices.find((p: StripePrice) => p.lookup_key === lookupKey);
      if (!price) {
        throw new Error(`Preu no trobat: ${lookupKey}`);
      }

      // Create checkout session with the price.id
      const response = await fetch(STRIPE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create-checkout-session",
          price_id: price.id,
          account_id: account.id,
          user_email: user.email,
          success_url: `${window.location.origin}/dashboard?checkout=success`,
          cancel_url: `${window.location.origin}/pricing`,
        }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Error desconegut";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { startCheckout, fetchPrices, prices, isLoading, error, isAuthenticated: !!user };
};
