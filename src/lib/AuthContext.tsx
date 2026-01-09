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

  const fetchUserData = async (userId: string) => {
    // Fetch user_profile - using explicit typing since tables may not be in generated types
    const { data: profileData } = await supabase
      .from("user_profiles" as any)
      .select("id, account_id, role, full_name")
      .eq("id", userId)
      .maybeSingle();

    if (profileData) {
      setProfile(profileData as unknown as UserProfile);

      // Fetch account
      const { data: accountData } = await supabase
        .from("accounts" as any)
        .select("id, company_name, tier, status")
        .eq("id", (profileData as any).account_id)
        .maybeSingle();

      if (accountData) {
        setAccount(accountData as unknown as Account);
      }
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchUserData(session.user.id);
        } else {
          setProfile(null);
          setAccount(null);
        }
        
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await fetchUserData(session.user.id);
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
