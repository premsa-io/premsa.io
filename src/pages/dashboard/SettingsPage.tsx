import { useAuth } from "@/lib/AuthContext";
import { User, Building2, Shield, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const SettingsPage = () => {
  const { user, profile, account, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-heading font-semibold text-foreground">Configuració</h1>
      <p className="mt-2 text-muted-foreground">
        Gestiona el teu compte i preferències.
      </p>

      <div className="mt-8 space-y-6">
        {/* User Info */}
        <div className="rounded-xl bg-card p-6 border border-border">
          <div className="flex items-center gap-3 mb-4">
            <User className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-heading font-medium text-foreground">Informació personal</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <p className="mt-1 text-foreground">{user?.email || "—"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Nom complet</label>
              <p className="mt-1 text-foreground">{profile?.full_name || "No especificat"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Rol</label>
              <p className="mt-1">
                {profile?.role ? (
                  <Badge variant="secondary">{profile.role}</Badge>
                ) : (
                  <span className="text-foreground">No especificat</span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Account Info */}
        {account && (
          <div className="rounded-xl bg-card p-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-heading font-medium text-foreground">Organització</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Nom de l'empresa</label>
                <p className="mt-1 text-foreground">{account.company_name || "No especificat"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Pla</label>
                <p className="mt-1">
                  {account.tier ? (
                    <Badge variant="default">{account.tier}</Badge>
                  ) : (
                    <span className="text-foreground">No especificat</span>
                  )}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Estat</label>
                <p className="mt-1">
                  {account.status ? (
                    <Badge 
                      variant={account.status === "active" ? "default" : "secondary"}
                    >
                      {account.status}
                    </Badge>
                  ) : (
                    <span className="text-foreground">—</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Security */}
        <div className="rounded-xl bg-card p-6 border border-border">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-heading font-medium text-foreground">Seguretat</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-muted-foreground">ID de compte</label>
              <p className="mt-1 text-foreground font-mono text-sm">
                {profile?.account_id || "—"}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">ID d'usuari</label>
              <p className="mt-1 text-foreground font-mono text-sm">
                {user?.id || "—"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
