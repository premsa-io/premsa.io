import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Shield, LogOut, AlertTriangle, Eye, EyeOff, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface PasswordRequirement {
  key: string;
  label: string;
  test: (password: string) => boolean;
}

export const SecurityTab = () => {
  const { t } = useTranslation();
  const { signOut, user } = useAuth();
  
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const passwordRequirements: PasswordRequirement[] = useMemo(() => [
    { 
      key: "minLength", 
      label: t("settings.security.requirements.minLength"),
      test: (p) => p.length >= 8 
    },
    { 
      key: "uppercase", 
      label: t("settings.security.requirements.uppercase"),
      test: (p) => /[A-Z]/.test(p) 
    },
    { 
      key: "lowercase", 
      label: t("settings.security.requirements.lowercase"),
      test: (p) => /[a-z]/.test(p) 
    },
    { 
      key: "number", 
      label: t("settings.security.requirements.number"),
      test: (p) => /[0-9]/.test(p) 
    },
  ], [t]);

  const passwordStrength = useMemo(() => {
    const passed = passwordRequirements.filter(req => req.test(passwordForm.newPassword)).length;
    return (passed / passwordRequirements.length) * 100;
  }, [passwordForm.newPassword, passwordRequirements]);

  const getStrengthColor = (strength: number) => {
    if (strength <= 25) return "bg-destructive";
    if (strength <= 50) return "bg-orange-500";
    if (strength <= 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthLabel = (strength: number) => {
    if (strength <= 25) return t("settings.security.strength.weak");
    if (strength <= 50) return t("settings.security.strength.fair");
    if (strength <= 75) return t("settings.security.strength.good");
    return t("settings.security.strength.strong");
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!passwordForm.currentPassword.trim()) {
      newErrors.currentPassword = t("settings.security.errors.currentRequired");
    }

    if (!passwordForm.newPassword) {
      newErrors.newPassword = t("settings.security.errors.newRequired");
    } else {
      const failedRequirements = passwordRequirements.filter(req => !req.test(passwordForm.newPassword));
      if (failedRequirements.length > 0) {
        newErrors.newPassword = t("settings.security.errors.requirementsNotMet");
      }
    }

    if (!passwordForm.confirmPassword) {
      newErrors.confirmPassword = t("settings.security.errors.confirmRequired");
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      newErrors.confirmPassword = t("settings.security.passwordMismatch");
    }

    if (passwordForm.newPassword && passwordForm.currentPassword && 
        passwordForm.newPassword === passwordForm.currentPassword) {
      newErrors.newPassword = t("settings.security.errors.sameAsOld");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordChange = async () => {
    if (!validateForm()) return;

    setIsChangingPassword(true);
    try {
      // First, verify current password by re-authenticating
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user?.email || "",
        password: passwordForm.currentPassword,
      });

      if (signInError) {
        setErrors({ currentPassword: t("settings.security.errors.incorrectPassword") });
        return;
      }

      // Update to new password
      const { error } = await supabase.auth.updateUser({
        password: passwordForm.newPassword,
      });

      if (error) throw error;
      
      toast.success(t("settings.security.passwordChanged"));
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setErrors({});
    } catch (error: any) {
      console.error("Error changing password:", error);
      
      // Handle specific Supabase errors
      if (error.message?.includes("same_password")) {
        setErrors({ newPassword: t("settings.security.errors.sameAsOld") });
      } else {
        toast.error(error.message || t("settings.security.passwordError"));
      }
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleSignOutAll = async () => {
    try {
      await supabase.auth.signOut({ scope: "global" });
      toast.success(t("settings.security.signedOutAll"));
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error(t("settings.security.signOutError"));
    }
  };

  const handleDeleteAccount = async () => {
    // Note: This would typically mark the account for deletion
    toast.info(t("settings.security.deleteRequested"));
  };

  const handleInputChange = (field: keyof typeof passwordForm, value: string) => {
    setPasswordForm(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const isFormValid = useMemo(() => {
    return (
      passwordForm.currentPassword.trim() !== "" &&
      passwordForm.newPassword !== "" &&
      passwordForm.confirmPassword !== "" &&
      passwordStrength === 100 &&
      passwordForm.newPassword === passwordForm.confirmPassword &&
      passwordForm.newPassword !== passwordForm.currentPassword
    );
  }, [passwordForm, passwordStrength]);

  return (
    <div className="space-y-8">
      {/* Change Password Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <h3 className="text-base font-medium">{t("settings.security.changePassword")}</h3>
        </div>
        
        <div className="grid gap-4 max-w-md">
          {/* Current Password */}
          <div className="space-y-2">
            <Label htmlFor="current-password">{t("settings.security.currentPassword")}</Label>
            <div className="relative">
              <Input
                id="current-password"
                type={showCurrentPassword ? "text" : "password"}
                value={passwordForm.currentPassword}
                onChange={(e) => handleInputChange("currentPassword", e.target.value)}
                placeholder="••••••••"
                className={errors.currentPassword ? "border-destructive" : ""}
                autoComplete="current-password"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            {errors.currentPassword && (
              <p className="text-xs text-destructive">{errors.currentPassword}</p>
            )}
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <Label htmlFor="new-password">{t("settings.security.newPassword")}</Label>
            <div className="relative">
              <Input
                id="new-password"
                type={showNewPassword ? "text" : "password"}
                value={passwordForm.newPassword}
                onChange={(e) => handleInputChange("newPassword", e.target.value)}
                placeholder="••••••••"
                className={errors.newPassword ? "border-destructive" : ""}
                autoComplete="new-password"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            {errors.newPassword && (
              <p className="text-xs text-destructive">{errors.newPassword}</p>
            )}
            
            {/* Password Strength Indicator */}
            {passwordForm.newPassword && (
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{t("settings.security.passwordStrength")}</span>
                  <span className={`font-medium ${passwordStrength === 100 ? "text-green-600" : "text-muted-foreground"}`}>
                    {getStrengthLabel(passwordStrength)}
                  </span>
                </div>
                <Progress value={passwordStrength} className={`h-1.5 ${getStrengthColor(passwordStrength)}`} />
                
                {/* Requirements List */}
                <ul className="space-y-1 pt-1">
                  {passwordRequirements.map((req) => {
                    const passed = req.test(passwordForm.newPassword);
                    return (
                      <li key={req.key} className="flex items-center gap-2 text-xs">
                        {passed ? (
                          <Check className="h-3.5 w-3.5 text-green-600" />
                        ) : (
                          <X className="h-3.5 w-3.5 text-muted-foreground" />
                        )}
                        <span className={passed ? "text-green-600" : "text-muted-foreground"}>
                          {req.label}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirm-password">{t("settings.security.confirmPassword")}</Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={passwordForm.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                placeholder="••••••••"
                className={errors.confirmPassword ? "border-destructive" : ""}
                autoComplete="new-password"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-destructive">{errors.confirmPassword}</p>
            )}
            {/* Password Match Indicator */}
            {passwordForm.confirmPassword && !errors.confirmPassword && passwordForm.newPassword === passwordForm.confirmPassword && (
              <p className="text-xs text-green-600 flex items-center gap-1">
                <Check className="h-3.5 w-3.5" />
                {t("settings.security.passwordsMatch")}
              </p>
            )}
          </div>

          <Button 
            onClick={handlePasswordChange} 
            disabled={isChangingPassword || !isFormValid}
            className="w-fit"
          >
            {isChangingPassword ? t("common.saving") : t("settings.security.updatePassword")}
          </Button>
        </div>
      </div>

      {/* Sessions Section */}
      <div className="pt-6 border-t border-border space-y-4">
        <div className="flex items-center gap-2">
          <LogOut className="h-5 w-5 text-primary" />
          <h3 className="text-base font-medium">{t("settings.security.sessions")}</h3>
        </div>
        
        <p className="text-sm text-muted-foreground">{t("settings.security.sessionsDescription")}</p>
        
        <div className="flex gap-3">
          <Button variant="outline" onClick={signOut}>
            {t("settings.security.signOut")}
          </Button>
          <Button variant="outline" onClick={handleSignOutAll}>
            {t("settings.security.signOutAll")}
          </Button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="pt-6 border-t border-destructive/30 space-y-4">
        <div className="flex items-center gap-2 text-destructive">
          <AlertTriangle className="h-5 w-5" />
          <h3 className="text-base font-medium">{t("settings.security.dangerZone")}</h3>
        </div>
        
        <p className="text-sm text-muted-foreground">{t("settings.security.deleteDescription")}</p>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">{t("settings.security.deleteAccount")}</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t("settings.security.deleteConfirmTitle")}</AlertDialogTitle>
              <AlertDialogDescription>
                {t("settings.security.deleteConfirmDescription")}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteAccount} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                {t("settings.security.confirmDelete")}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};