import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Initialize Stripe
const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2023-10-16",
});

interface LineItem {
  price: string;
  quantity: number;
}

interface CheckoutParams {
  action: string;
  price_id?: string;
  line_items?: LineItem[];
  account_id?: string;
  user_email?: string;
  success_url: string;
  cancel_url: string;
}

// Get all active prices from Stripe
async function getPrices() {
  console.log("Fetching prices from Stripe...");
  
  const prices = await stripe.prices.list({
    active: true,
    expand: ["data.product"],
  });

  const formattedPrices = prices.data.map((price: Stripe.Price) => ({
    id: price.id,
    lookup_key: price.lookup_key,
    unit_amount: price.unit_amount,
    currency: price.currency,
    product_name: typeof price.product === "object" && price.product !== null ? (price.product as Stripe.Product).name : null,
    recurring: price.recurring,
  }));

  console.log(`Found ${formattedPrices.length} prices`);
  return new Response(JSON.stringify({ prices: formattedPrices }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

// Create checkout session
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function createCheckoutSession(
  supabase: any,
  auth: { userId?: string; email?: string; accountId?: string },
  params: CheckoutParams
) {
  const { price_id, line_items, account_id: paramAccountId, user_email, success_url, cancel_url } = params;

  console.log("=== createCheckoutSession DEBUG ===");
  console.log("auth.accountId (from JWT):", auth.accountId);
  console.log("paramAccountId (from body):", paramAccountId);
  console.log("auth.userId:", auth.userId);
  console.log("line_items:", JSON.stringify(line_items));

  // ✅ Usar account_id del JWT si existeix, sinó del body (fallback per nous usuaris)
  const account_id = auth.accountId || paramAccountId;
  const email = user_email || auth.email;

  console.log("Final account_id:", account_id);
  console.log("Final email:", email);

  if (!account_id) {
    console.error("❌ No account_id available from JWT or params");
    return new Response(
      JSON.stringify({ error: "No account associated with user. Provide account_id in request." }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  // ✅ Verificació de seguretat: confirmar que l'account pertany a l'usuari
  if (paramAccountId && !auth.accountId && auth.userId && supabase) {
    console.log("Verifying account ownership for new user...");
    const { data: profile, error: profileError } = await supabase
      .from("user_profiles")
      .select("account_id")
      .eq("id", auth.userId)
      .single();

    console.log("Profile lookup result:", profile, profileError);

    if (profileError) {
      console.error("❌ Error fetching profile:", profileError);
      // Continue anyway - profile might not exist yet during onboarding
    } else if (profile?.account_id !== paramAccountId) {
      console.error("❌ Account ID mismatch:", profile?.account_id, "!==", paramAccountId);
      return new Response(
        JSON.stringify({ error: "Account ID does not match user" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    console.log("✅ Account ownership verified");
  }

  // Build line_items for Stripe
  let stripeLineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  if (line_items && line_items.length > 0) {
    stripeLineItems = line_items.map((item) => ({
      price: item.price,
      quantity: item.quantity,
    }));
    console.log("Using line_items from request:", JSON.stringify(stripeLineItems));
  } else if (price_id) {
    stripeLineItems = [{ price: price_id, quantity: 1 }];
    console.log("Using single price_id:", price_id);
  } else {
    console.error("❌ No line_items or price_id provided");
    return new Response(
      JSON.stringify({ error: "No line_items or price_id provided" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  // Find or create Stripe customer
  let customerId: string | undefined;
  
  if (email) {
    console.log("Looking for existing customer with email:", email);
    const customers = await stripe.customers.list({ email, limit: 1 });
    
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      console.log("Found existing customer:", customerId);
    } else {
      console.log("Creating new customer...");
      const customer = await stripe.customers.create({
        email,
        metadata: { account_id, user_id: auth.userId || "" },
      });
      customerId = customer.id;
      console.log("Created new customer:", customerId);
    }
  }

  // Create checkout session
  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    mode: "subscription",
    line_items: stripeLineItems,
    success_url,
    cancel_url,
    metadata: { account_id },
    subscription_data: {
      metadata: { account_id },
    },
  };

  if (customerId) {
    sessionParams.customer = customerId;
  } else if (email) {
    sessionParams.customer_email = email;
  }

  console.log("Creating Stripe checkout session with params:", JSON.stringify(sessionParams));

  const session = await stripe.checkout.sessions.create(sessionParams);
  console.log("✅ Checkout session created:", session.id, session.url);

  return new Response(
    JSON.stringify({ url: session.url, sessionId: session.id }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
}

// Create customer portal session
async function createPortalSession(
  auth: { userId?: string; email?: string; accountId?: string },
  params: { return_url: string }
) {
  const { return_url } = params;
  const email = auth.email;

  console.log("Creating portal session for:", email);

  if (!email) {
    return new Response(
      JSON.stringify({ error: "No email found for user" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  const customers = await stripe.customers.list({ email, limit: 1 });
  
  if (customers.data.length === 0) {
    return new Response(
      JSON.stringify({ error: "No Stripe customer found" }),
      { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: customers.data[0].id,
    return_url,
  });

  console.log("✅ Portal session created:", session.url);

  return new Response(
    JSON.stringify({ url: session.url }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
}

// Main handler
Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body: CheckoutParams = await req.json();
    const { action } = body;

    console.log("=== stripe-checkout request ===");
    console.log("Action:", action);
    console.log("Body:", JSON.stringify(body));

    // Handle get-prices (no auth required)
    if (action === "get-prices") {
      return await getPrices();
    }

    // For other actions, validate JWT
    const authHeader = req.headers.get("Authorization");
    
    // Initialize auth object
    let auth: { userId?: string; email?: string; accountId?: string } = {};

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_ANON_KEY") || "",
      authHeader?.startsWith("Bearer ") 
        ? { global: { headers: { Authorization: authHeader } } }
        : undefined
    );

    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.replace("Bearer ", "");
      const { data: userData, error: userError } = await supabase.auth.getUser(token);

      if (userError) {
        console.error("JWT validation error:", userError);
      } else if (userData?.user) {
        auth = {
          userId: userData.user.id,
          email: userData.user.email,
          accountId: (userData.user.app_metadata as { account_id?: string })?.account_id,
        };
        console.log("Auth from JWT:", JSON.stringify(auth));
      }
    }

    // Route to appropriate handler
    if (action === "create-checkout-session") {
      return await createCheckoutSession(supabase, auth, body);
    } else if (action === "create-portal-session") {
      return await createPortalSession(auth, { return_url: body.cancel_url });
    }

    return new Response(
      JSON.stringify({ error: `Unknown action: ${action}` }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: unknown) {
    console.error("❌ stripe-checkout error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
