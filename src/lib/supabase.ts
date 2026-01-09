import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.MY_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.MY_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables: MY_SUPABASE_URL or MY_SUPABASE_ANON_KEY');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
