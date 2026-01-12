import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

interface UserProfile {
  id: string;
  account_id: string;
  role: string;
  full_name: string | null;
}

interface Account {
  id: string;
  company_name: string | null;
  tier: string | null;
  status: string | null;
  sector: string | null;
  company_size: string | null;
  countries_of_operation: string[] | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  profile: UserProfile | null;
  account: Account | null;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [account, setAccount] = useState<Account | null>(null);

  // Helper to decode JWT and extract account_id
  const getAccountIdFromToken = (accessToken: string): string | null => {
    try {
      const payload = JSON.parse(atob(accessToken.split('.')[1]));
      return payload.account_id || null;
    } catch {
      return null;
    }
  };

  const fetchUserData = async (userId: string, currentSession: Session) => {
    // Extract account_id from JWT first
    const jwtAccountId = getAccountIdFromToken(currentSession.access_token);
    const metaAccountId = currentSession.user?.app_metadata?.account_id;
    const fallbackAccountId = metaAccountId || jwtAccountId;

    // Set fallback profile/account immediately so dashboard can work
    if (fallbackAccountId) {
      setProfile({
        id: userId,
        account_id: fallbackAccountId,
        role: currentSession.user?.app_metadata?.role || "user",
        full_name: currentSession.user?.user_metadata?.full_name || null,
      });
      setAccount({
        id: fallbackAccountId,
        company_name: null,
        tier: null,
        status: null,
        sector: null,
        company_size: null,
        countries_of_operation: null,
      });
    }

    // Try to enrich with DB data (best effort)
    try {
      const { data: profileData, error: profileError } = await supabase
        .from("user_profiles" as any)
        .select("id, account_id, role, full_name")
        .eq("id", userId)
        .maybeSingle();

      if (!profileError && profileData) {
        setProfile(profileData as unknown as UserProfile);

        // Fetch account details
        const accountId = (profileData as any).account_id;
        const { data: accountData } = await supabase
          .from("accounts" as any)
          .select("id, company_name, tier, status, sector, company_size, countries_of_operation")
          .eq("id", accountId)
          .maybeSingle();

        if (accountData) {
          setAccount(accountData as unknown as Account);
        }
      }
    } catch {
      // Keep fallback data on error
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user && session) {
          // Fire and forget - don't block auth state
          fetchUserData(session.user.id, session);
        } else {
          setProfile(null);
          setAccount(null);
        }
        
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user && session) {
        // Fire and forget - don't block initial load
        fetchUserData(session.user.id, session);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
    setAccount(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, profile, account, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
