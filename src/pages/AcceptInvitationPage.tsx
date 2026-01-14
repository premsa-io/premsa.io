import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle2, XCircle, Building2 } from "lucide-react";
import { toast } from "sonner";

interface InvitationData {
  email: string;
  role: string;
  company_name: string;
  expires_at: string;
}

type Status = "loading" | "valid" | "error" | "accepting" | "success";

export default function AcceptInvitationPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string | null>(null);
  const [invitation, setInvitation] = useState<InvitationData | null>(null);
  
  const token = searchParams.get("token");

  // Validate token
  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setStatus("error");
        setError("missing_token");
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke("accept-invitation", {
          body: { token, action: "validate" }
        });

        if (error || !data?.valid) {
          setStatus("error");
          setError(data?.error || "invalid_token");
          return;
        }

        setInvitation(data.invitation);
        setStatus("valid");
      } catch (err) {
        console.error("Error validating invitation:", err);
        setStatus("error");
        setError("validation_failed");
      }
    };

    validateToken();
  }, [token]);

  // Accept invitation
  const handleAccept = async () => {
    if (!user || !token) return;

    if (user.email?.toLowerCase() !== invitation?.email.toLowerCase()) {
      toast.error(t("invitation.emailMismatch"));
      return;
    }

    setStatus("accepting");

    try {
      const { data, error } = await supabase.functions.invoke("accept-invitation", {
        body: { 
          token, 
          action: "accept",
          user_id: user.id 
        }
      });

      if (error || !data?.success) {
        throw new Error(data?.error || "accept_failed");
      }

      setStatus("success");
      toast.success(t("invitation.acceptSuccess", { company: data.company_name }));
      
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err: any) {
      console.error("Error accepting invitation:", err);
      setStatus("error");
      setError(err.message || "accept_failed");
      toast.error(t("invitation.acceptError"));
    }
  };

  const handleLogin = () => {
    sessionStorage.setItem("pendingInvitationToken", token || "");
    navigate(`/login?redirect=/accept-invitation?token=${token}`);
  };

  // Loading
  if (status === "loading" || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">{t("invitation.validating")}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error
  if (status === "error") {
    const errorMessages: Record<string, string> = {
      missing_token: t("invitation.errors.missingToken"),
      invalid_token: t("invitation.errors.invalidToken"),
      expired: t("invitation.errors.expired"),
      cancelled: t("invitation.errors.cancelled"),
      already_accepted: t("invitation.errors.alreadyAccepted"),
      email_mismatch: t("invitation.errors.emailMismatch"),
      validation_failed: t("invitation.errors.validationFailed"),
      accept_failed: t("invitation.errors.acceptFailed"),
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <XCircle className="h-12 w-12 text-destructive mx-auto mb-2" />
            <CardTitle>{t("invitation.errorTitle")}</CardTitle>
            <CardDescription>
              {errorMessages[error || ""] || t("invitation.errors.generic")}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button onClick={() => navigate("/")} variant="outline">
              {t("invitation.goHome")}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Success
  if (status === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-2" />
            <CardTitle>{t("invitation.successTitle")}</CardTitle>
            <CardDescription>{t("invitation.successDescription")}</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button onClick={() => navigate("/dashboard")}>
              {t("invitation.goToDashboard")}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Valid invitation - show details
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Building2 className="h-6 w-6 text-primary" />
          </div>
          <CardTitle>{t("invitation.title")}</CardTitle>
          <CardDescription>
            {t("invitation.description", { company: invitation?.company_name })}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3 rounded-lg bg-muted/50 p-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t("invitation.email")}</span>
              <span className="font-medium">{invitation?.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t("invitation.role")}</span>
              <span className="font-medium">
                {invitation?.role === "org_admin" 
                  ? t("invitation.roleAdmin") 
                  : t("invitation.roleMember")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t("invitation.company")}</span>
              <span className="font-medium">{invitation?.company_name}</span>
            </div>
          </div>

          {!user ? (
            <div className="space-y-3">
              <p className="text-sm text-center text-muted-foreground">
                {t("invitation.loginRequired")}
              </p>
              <div className="flex gap-2">
                <Button onClick={handleLogin} className="flex-1">
                  {t("invitation.login")}
                </Button>
                <Button 
                  onClick={() => navigate(`/onboarding/step-1?email=${invitation?.email}&redirect=/accept-invitation?token=${token}`)} 
                  variant="outline" 
                  className="flex-1"
                >
                  {t("invitation.signup")}
                </Button>
              </div>
            </div>
          ) : user.email?.toLowerCase() !== invitation?.email.toLowerCase() ? (
            <div className="space-y-3">
              <p className="text-sm text-center text-amber-600 bg-amber-50 rounded-lg p-3">
                {t("invitation.wrongEmail", { 
                  current: user.email, 
                  expected: invitation?.email 
                })}
              </p>
              <Button onClick={() => supabase.auth.signOut()} variant="outline" className="w-full">
                {t("invitation.switchAccount")}
              </Button>
            </div>
          ) : (
            <Button onClick={handleAccept} className="w-full" disabled={status === "accepting"}>
              {status === "accepting" ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {t("invitation.accepting")}
                </>
              ) : (
                t("invitation.accept")
              )}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
