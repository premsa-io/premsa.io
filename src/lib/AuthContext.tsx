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
    console.log("[AuthContext] 🔍 Fetching user data for:", userId);
    console.log("[AuthContext] 🔗 Using Supabase URL:", "evdrqasjbwputqqejqqe.supabase.co");
    
    try {
      // Fetch user_profile from external Supabase
      console.log("[AuthContext] 📡 Querying user_profiles table...");
      const { data: profileData, error: profileError } = await supabase
        .from("user_profiles" as any)
        .select("id, account_id, role, full_name")
        .eq("id", userId)
        .maybeSingle();

      console.log("[AuthContext] 📊 Profile query result:", {
        data: profileData,
        error: profileError?.message,
        errorCode: profileError?.code,
        errorDetails: profileError?.details,
      });

      if (profileError) {
        console.error("[AuthContext] ❌ Error fetching profile:", profileError);
        return;
      }

      if (profileData) {
        console.log("[AuthContext] ✅ Profile loaded:", profileData);
        setProfile(profileData as unknown as UserProfile);

        // Fetch account
        console.log("[AuthContext] 📡 Querying accounts table for account_id:", (profileData as any).account_id);
        const { data: accountData, error: accountError } = await supabase
          .from("accounts" as any)
          .select("id, company_name, tier, status")
          .eq("id", (profileData as any).account_id)
          .maybeSingle();

        console.log("[AuthContext] 📊 Account query result:", {
          data: accountData,
          error: accountError?.message,
          errorCode: accountError?.code,
        });

        if (accountData) {
          console.log("[AuthContext] ✅ Account loaded:", accountData);
          setAccount(accountData as unknown as Account);
        } else {
          console.warn("[AuthContext] ⚠️ No account found for account_id:", (profileData as any).account_id);
        }
      } else {
        console.warn("[AuthContext] ⚠️ No profile found for user:", userId);
      }
    } catch (e) {
      console.error("[AuthContext] 💥 Unexpected error in fetchUserData:", e);
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        console.log("[AuthContext] Auth state changed:", _event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fire and forget - don't block auth state
          fetchUserData(session.user.id);
        } else {
          setProfile(null);
          setAccount(null);
        }
        
        setLoading(false); // IMMEDIATELY set loading to false
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("[AuthContext] Initial session check:", session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        // Fire and forget - don't block initial load
        fetchUserData(session.user.id);
      }
      
      setLoading(false); // IMMEDIATELY set loading to false
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
