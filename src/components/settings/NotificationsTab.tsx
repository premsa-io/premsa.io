import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Bell, Mail, Clock, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface NotificationPreferences {
  email_alerts: boolean;
  urgent_alerts: boolean;
  daily_digest: boolean;
  weekly_digest: boolean;
  marketing: boolean;
}

export const NotificationsTab = () => {
  const { t } = useTranslation();
  const { profile } = useAuth();
  
  const [isSaving, setIsSaving] = useState(false);
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    email_alerts: true,
    urgent_alerts: true,
    daily_digest: false,
    weekly_digest: true,
    marketing: false,
  });

  const handleToggle = (key: keyof NotificationPreferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    if (!profile?.id) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("user_profiles" as any)
        .update({
          notification_preferences: preferences,
        })
        .eq("id", profile.id);

      if (error) throw error;
      toast.success(t("settings.notifications.saveSuccess"));
    } catch (error) {
      console.error("Error saving preferences:", error);
      toast.error(t("settings.notifications.saveError"));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Alerts Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          <h3 className="text-base font-medium">{t("settings.notifications.alerts")}</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <Label htmlFor="email_alerts" className="text-base font-medium cursor-pointer">
                  {t("settings.notifications.emailAlerts")}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {t("settings.notifications.emailAlertsDescription")}
                </p>
              </div>
            </div>
            <Switch
              id="email_alerts"
              checked={preferences.email_alerts}
              onCheckedChange={() => handleToggle("email_alerts")}
            />
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div className="flex items-start gap-3">
              <Bell className="h-5 w-5 text-destructive mt-0.5" />
              <div>
                <Label htmlFor="urgent_alerts" className="text-base font-medium cursor-pointer">
                  {t("settings.notifications.urgentAlerts")}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {t("settings.notifications.urgentAlertsDescription")}
                </p>
              </div>
            </div>
            <Switch
              id="urgent_alerts"
              checked={preferences.urgent_alerts}
              onCheckedChange={() => handleToggle("urgent_alerts")}
            />
          </div>
        </div>
      </div>

      {/* Digests Section */}
      <div className="pt-6 border-t border-border space-y-4">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <h3 className="text-base font-medium">{t("settings.notifications.digests")}</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div>
              <Label htmlFor="daily_digest" className="text-base font-medium cursor-pointer">
                {t("settings.notifications.dailyDigest")}
              </Label>
              <p className="text-sm text-muted-foreground">
                {t("settings.notifications.dailyDigestDescription")}
              </p>
            </div>
            <Switch
              id="daily_digest"
              checked={preferences.daily_digest}
              onCheckedChange={() => handleToggle("daily_digest")}
            />
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div>
              <Label htmlFor="weekly_digest" className="text-base font-medium cursor-pointer">
                {t("settings.notifications.weeklyDigest")}
              </Label>
              <p className="text-sm text-muted-foreground">
                {t("settings.notifications.weeklyDigestDescription")}
              </p>
            </div>
            <Switch
              id="weekly_digest"
              checked={preferences.weekly_digest}
              onCheckedChange={() => handleToggle("weekly_digest")}
            />
          </div>
        </div>
      </div>

      {/* Communications Section */}
      <div className="pt-6 border-t border-border space-y-4">
        <div className="flex items-center gap-2">
          <Megaphone className="h-5 w-5 text-primary" />
          <h3 className="text-base font-medium">{t("settings.notifications.communications")}</h3>
        </div>
        
        <div className="flex items-center justify-between rounded-lg border border-border p-4">
          <div>
            <Label htmlFor="marketing" className="text-base font-medium cursor-pointer">
              {t("settings.notifications.marketing")}
            </Label>
            <p className="text-sm text-muted-foreground">
              {t("settings.notifications.marketingDescription")}
            </p>
          </div>
          <Switch
            id="marketing"
            checked={preferences.marketing}
            onCheckedChange={() => handleToggle("marketing")}
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-4">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? t("common.saving") : t("settings.notifications.savePreferences")}
        </Button>
      </div>
    </div>
  );
};
