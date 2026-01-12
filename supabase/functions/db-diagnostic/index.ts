import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Connect to external DB with service role key (bypasses RLS)
    const supabaseUrl = Deno.env.get("MY_SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    if (!supabaseUrl || !serviceRoleKey) {
      return new Response(JSON.stringify({ 
        error: "Missing environment variables",
        hasUrl: !!supabaseUrl,
        hasKey: !!serviceRoleKey 
      }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const results: Record<string, unknown> = {};

    // 1. List all tables in public schema
    const { data: tables, error: tablesError } = await supabase
      .from("information_schema.tables")
      .select("table_name")
      .eq("table_schema", "public");
    
    // If that doesn't work, try a direct query approach
    if (tablesError) {
      // Alternative: query pg_tables
      const { data: pgTables, error: pgTablesError } = await supabase
        .rpc("get_public_tables");
      results.tables = pgTables || [];
      results.tablesError = pgTablesError?.message || tablesError?.message;
    } else {
      results.tables = tables?.map(t => t.table_name) || [];
    }

    // 2. Query RLS policies from pg_policies view
    const { data: policies, error: policiesError } = await supabase
      .from("pg_policies")
      .select("schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check");
    
    if (policiesError) {
      results.policiesError = policiesError.message;
      results.policies = [];
    } else {
      results.policies = policies || [];
    }

    // 3. Find user test@premsa.io in user_profiles
    const { data: userData, error: userError } = await supabase
      .from("user_profiles")
      .select("id, account_id, full_name, email")
      .eq("email", "test@premsa.io")
      .maybeSingle();

    results.user = userData;
    results.userError = userError?.message;

    // 4. If we have account_id, count records in each table
    if (userData?.account_id) {
      const accountId = userData.account_id;
      results.accountId = accountId;

      // Get account info
      const { data: accountData, error: accountError } = await supabase
        .from("accounts")
        .select("*")
        .eq("id", accountId)
        .maybeSingle();
      
      results.account = accountData;
      results.accountError = accountError?.message;

      // Count matches
      const { count: matchesCount, error: matchesError } = await supabase
        .from("client_matches")
        .select("*", { count: "exact", head: true })
        .eq("account_id", accountId);
      
      // Count alerts
      const { count: alertsCount, error: alertsError } = await supabase
        .from("alerts")
        .select("*", { count: "exact", head: true })
        .eq("account_id", accountId);

      // Count reports
      const { count: reportsCount, error: reportsError } = await supabase
        .from("reports")
        .select("*", { count: "exact", head: true })
        .eq("account_id", accountId);

      // Count topics
      const { count: topicsCount, error: topicsError } = await supabase
        .from("topics")
        .select("*", { count: "exact", head: true })
        .eq("account_id", accountId);

      // Try client_knowledge_base if exists
      const { count: kbCount, error: kbError } = await supabase
        .from("client_knowledge_base")
        .select("*", { count: "exact", head: true })
        .eq("account_id", accountId);

      // Try client_interpretations if exists
      const { count: interpCount, error: interpError } = await supabase
        .from("client_interpretations")
        .select("*", { count: "exact", head: true })
        .eq("account_id", accountId);

      // Try inferred_interests if exists
      const { count: interestsCount, error: interestsError } = await supabase
        .from("inferred_interests")
        .select("*", { count: "exact", head: true })
        .eq("account_id", accountId);

      results.dataCounts = {
        client_matches: { count: matchesCount, error: matchesError?.message },
        alerts: { count: alertsCount, error: alertsError?.message },
        reports: { count: reportsCount, error: reportsError?.message },
        topics: { count: topicsCount, error: topicsError?.message },
        client_knowledge_base: { count: kbCount, error: kbError?.message },
        client_interpretations: { count: interpCount, error: interpError?.message },
        inferred_interests: { count: interestsCount, error: interestsError?.message },
      };

      // Get sample data from each table (first 3 records)
      const { data: sampleMatches } = await supabase
        .from("client_matches")
        .select("id, created_at, relevance_score")
        .eq("account_id", accountId)
        .limit(3);

      const { data: sampleAlerts } = await supabase
        .from("alerts")
        .select("id, title, created_at")
        .eq("account_id", accountId)
        .limit(3);

      const { data: sampleReports } = await supabase
        .from("reports")
        .select("id, title, created_at")
        .eq("account_id", accountId)
        .limit(3);

      results.sampleData = {
        matches: sampleMatches || [],
        alerts: sampleAlerts || [],
        reports: sampleReports || [],
      };
    }

    // 5. Check if function get_user_account_id exists
    const { data: functions, error: functionsError } = await supabase
      .rpc("get_user_account_id");
    
    results.hasGetUserAccountIdFunction = !functionsError;
    results.functionError = functionsError?.message;

    return new Response(JSON.stringify(results, null, 2), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (err) {
    const error = err as Error;
    return new Response(JSON.stringify({ 
      error: error.message,
      stack: error.stack 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
