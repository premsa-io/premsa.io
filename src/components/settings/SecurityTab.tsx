import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Shield, LogOut, AlertTriangle, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

  const handlePasswordChange = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error(t("settings.security.passwordMismatch"));
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      toast.error(t("settings.security.passwordTooShort"));
      return;
    }

    setIsChangingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordForm.newPassword,
      });

      if (error) throw error;
      
      toast.success(t("settings.security.passwordChanged"));
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error: any) {
      console.error("Error changing password:", error);
      toast.error(error.message || t("settings.security.passwordError"));
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

  return (
    <div className="space-y-8">
      {/* Change Password Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <h3 className="text-base font-medium">{t("settings.security.changePassword")}</h3>
        </div>
        
        <div className="grid gap-4 max-w-md">
          <div className="space-y-2">
            <Label htmlFor="current-password">{t("settings.security.currentPassword")}</Label>
            <div className="relative">
              <Input
                id="current-password"
                type={showCurrentPassword ? "text" : "password"}
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                placeholder="••••••••"
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-password">{t("settings.security.newPassword")}</Label>
            <div className="relative">
              <Input
                id="new-password"
                type={showNewPassword ? "text" : "password"}
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                placeholder="••••••••"
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
            <p className="text-xs text-muted-foreground">{t("settings.security.passwordHint")}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">{t("settings.security.confirmPassword")}</Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                placeholder="••••••••"
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
          </div>

          <Button 
            onClick={handlePasswordChange} 
            disabled={isChangingPassword || !passwordForm.newPassword || !passwordForm.confirmPassword}
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
