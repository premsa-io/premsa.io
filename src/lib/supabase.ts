import { createClient } from '@supabase/supabase-js';

/**
 * IMPORTANT: This is the ONLY Supabase client used in this project.
 * All imports should use: import { supabase } from "@/lib/supabase";
 * 
 * DO NOT use @/integrations/supabase/client.ts (Lovable Cloud auto-generated file).
 * This project connects exclusively to the external Supabase project.
 */
const supabaseUrl = "https://evdrqasjbwputqqejqqe.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2ZHJxYXNqYndwdXRxcWVqcXFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1MDQ1NTUsImV4cCI6MjA4MjA4MDU1NX0.COSc8kCs7VdpTMIQ0jmuOkiAykuZn1n3UwKWj1xUkYU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});

console.log("Connected to Supabase:", supabaseUrl);
