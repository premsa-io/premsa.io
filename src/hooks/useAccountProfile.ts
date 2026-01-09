import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/AuthContext";

export interface AccountProfile {
  id: string;
  company_name: string | null;
  sector: string | null;
  company_size: string | null;
  countries_of_operation: string[] | null;
  interface_language: string | null;
  content_language: string | null;
  tier: string | null;
  status: string | null;
}

export const useAccountProfile = () => {
  const { profile } = useAuth();
  const [accountProfile, setAccountProfile] = useState<AccountProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!profile?.account_id) {
      setIsLoading(false);
      return;
    }

    const fetchAccountProfile = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("accounts" as any)
        .select("id, company_name, sector, company_size, countries_of_operation, interface_language, content_language, tier, status")
        .eq("id", profile.account_id)
        .maybeSingle();

      if (!error && data) {
        setAccountProfile(data as AccountProfile);
      }
      setIsLoading(false);
    };

    fetchAccountProfile();
  }, [profile?.account_id]);

  return { accountProfile, isLoading };
};
