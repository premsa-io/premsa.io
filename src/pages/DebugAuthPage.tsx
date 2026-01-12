import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface DebugInfo {
  timestamp: string;
  origin: string;
  href: string;
  userAgent: string;
  session: {
    exists: boolean;
    user: string | null;
    expiresAt: number | null;
    error: string | null;
  };
  localStorage: {
    totalKeys: number;
    authKeys: Record<string, string | null>;
  };
  cookies: {
    enabled: boolean;
  };
  supabaseUrl: string;
}

export default function DebugAuthPage() {
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const gatherDebugInfo = async () => {
      // Get current session
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      // Get localStorage keys related to auth
      const storageKeys: Record<string, string | null> = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('sb-') || key.includes('supabase') || key.includes('auth'))) {
          const value = localStorage.getItem(key);
          storageKeys[key] = value ? `${value.slice(0, 100)}...` : null;
        }
      }

      setDebugInfo({
        timestamp: new Date().toISOString(),
        origin: window.location.origin,
        href: window.location.href,
        userAgent: navigator.userAgent.slice(0, 100),
        session: {
          exists: !!sessionData?.session,
          user: sessionData?.session?.user?.email || null,
          expiresAt: sessionData?.session?.expires_at || null,
          error: sessionError?.message || null,
        },
        localStorage: {
          totalKeys: localStorage.length,
          authKeys: storageKeys,
        },
        cookies: {
          enabled: navigator.cookieEnabled,
        },
        supabaseUrl: import.meta.env.VITE_SUPABASE_URL || 'not set',
      });
      setLoading(false);
    };

    gatherDebugInfo();
  }, []);

  const testLogin = async () => {
    const email = prompt("Email:");
    const password = prompt("Password:");
    if (!email || !password) return;

    console.log("[DebugAuth] Attempting login...");
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    console.log("[DebugAuth] Login result:", { data, error });
    alert(error ? `Error: ${error.message}` : `Success! User: ${data.user?.email}`);
    window.location.reload();
  };

  const testLogout = async () => {
    console.log("[DebugAuth] Attempting logout...");
    const { error } = await supabase.auth.signOut();
    console.log("[DebugAuth] Logout result:", { error });
    alert(error ? `Error: ${error.message}` : 'Logged out!');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">🔧 Auth Debug Page</h1>
        
        <div className="flex gap-4 mb-6">
          <button
            onClick={testLogin}
            className="px-4 py-2 bg-primary text-primary-foreground rounded"
          >
            Test Login
          </button>
          <button
            onClick={testLogout}
            className="px-4 py-2 bg-destructive text-destructive-foreground rounded"
          >
            Test Logout
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <p>Loading debug info...</p>
        ) : (
          <pre className="bg-muted p-4 rounded-lg overflow-auto text-xs">
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        )}

        {debugInfo && (
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <h2 className="font-semibold mb-2">Checklist:</h2>
            <ul className="text-sm space-y-1">
              <li>✅ Session exists: <strong>{debugInfo.session.exists ? 'Yes' : 'No'}</strong></li>
              <li>✅ User email: <strong>{debugInfo.session.user || 'None'}</strong></li>
              <li>✅ Supabase URL configured: <strong>{debugInfo.supabaseUrl ? 'Yes' : 'No'}</strong></li>
              <li>✅ Auth localStorage keys found: <strong>{Object.keys(debugInfo.localStorage.authKeys).length}</strong></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
