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
    console.log("=== startCheckout DEBUG ===");
    console.log("lookupKey:", lookupKey);
    console.log("user:", user);
    console.log("account:", account);

    if (!user || !account) {
      console.log("❌ Missing user or account");
      const errorMsg = "Has d'iniciar sessió per contractar";
      setError(errorMsg);
      throw new Error(errorMsg);
    }

    setIsLoading(true);
    setError(null);

    try {
      // First, fetch prices if we don't have them
      let currentPrices = prices;
      if (currentPrices.length === 0) {
        console.log("Fetching prices from Stripe...");
        currentPrices = await fetchPrices();
      }

      console.log("Prices loaded:", currentPrices.length);
      console.log("Available lookup_keys:", currentPrices.map(p => p.lookup_key));

      // Find the price by lookup_key
      const price = currentPrices.find((p: StripePrice) => p.lookup_key === lookupKey);
      console.log("Found price:", price);

      if (!price) {
        const availableKeys = currentPrices.map(p => p.lookup_key).join(", ");
        const errorMsg = `Preu no trobat: "${lookupKey}". Disponibles: ${availableKeys || "cap"}`;
        console.error("❌", errorMsg);
        throw new Error(errorMsg);
      }

      console.log("Creating checkout session with price_id:", price.id);

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
      console.log("Checkout response:", data);

      if (data.error) throw new Error(data.error);

      // Redirect to Stripe Checkout
      if (data.url) {
        console.log("✅ Redirecting to Stripe:", data.url);
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Error desconegut";
      console.error("❌ Checkout error:", errorMessage);
      setError(errorMessage);
      throw err; // Re-throw per permetre try/catch a PricingPage
    } finally {
      setIsLoading(false);
    }
  };

  return { startCheckout, fetchPrices, prices, isLoading, error, isAuthenticated: !!user };
};
