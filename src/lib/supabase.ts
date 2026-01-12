import { createClient } from '@supabase/supabase-js';

/**
 * IMPORTANT: This is the ONLY Supabase client used in this project.
 * All imports should use: import { supabase } from "@/lib/supabase";
 * 
 * DO NOT use @/integrations/supabase/client.ts (Lovable Cloud auto-generated file).
 * This project connects exclusively to the external Supabase project.
 * 
 * Credentials are stored securely in environment variables:
 * - MY_SUPABASE_URL: External Supabase project URL
 * - MY_SUPABASE_ANON_KEY: External Supabase anon/public key
 */
const supabaseUrl = import.meta.env.VITE_MY_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_MY_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Ensure VITE_MY_SUPABASE_URL and VITE_MY_SUPABASE_ANON_KEY are configured."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
